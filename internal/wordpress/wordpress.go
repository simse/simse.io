package wordpress

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/alecthomas/chroma"
	chroma_html "github.com/alecthomas/chroma/formatters/html"
	"github.com/alecthomas/chroma/lexers"
	"github.com/alecthomas/chroma/styles"
	"github.com/imroc/req/v3"
	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/database"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/html"
)

type PostRaw struct {
	ID struct {
		Rendered string `json:"rendered"`
	} `json:"guid"`
	Title struct {
		Rendered string `json:"rendered"`
	} `json:"title"`
	Date        string `json:"date"`
	DateGMT     string `json:"date_gmt"`
	Modified    string `json:"modified"`
	ModifiedGMT string `json:"modified_gmt"`
	Slug        string `json:"slug"`
	Status      string `json:"status"`
	Type        string `json:"type"`
	Content     struct {
		Rendered string `json:"rendered"`
	} `json:"content"`
	Excerpt struct {
		Rendered string `json:"rendered"`
	} `json:"excerpt"`
	Tags          []int `json:"tags"`
	Categories    []int `json:"categories"`
	FeaturedMedia int   `json:"featured_media"`
}

type TaxemonyRaw struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Slug        string `json:"slug"`
}

type MediaRaw struct {
	ID        int    `json:"id"`
	SourceURL string `json:"source_url"`
}

var WORDPRESS_URL = "https://simse-wp.sorensen.cloud/wp-json/wp/v2/"

func GetPosts() ([]database.Post, error) {
	var rawPosts []PostRaw

	for _, status := range []string{"publish", "draft"} {
		posts, err := getPostsForStatus(status)
		if err != nil {
			return nil, err
		}

		rawPosts = append(rawPosts, posts...)
	}

	var posts []database.Post
	for _, post := range rawPosts {
		p, err := rawToPost(post)
		if err != nil {
			return nil, err
		}

		posts = append(posts, p)
		log.Info().Str("id", p.ID).Msg("fetched wordpress post")
	}

	return posts, nil
}

func getPostsForStatus(status string) ([]PostRaw, error) {
	client := req.C().SetBaseURL(WORDPRESS_URL)

	client.SetCommonBasicAuth("simon", "Cfef c6l0 1Rd3 btbG nj9e 4bxn")

	var rawPosts []PostRaw
	err := client.Get().SetURL("posts").SetQueryParam("per_page", "100").SetQueryParam("status", status).Do().Into(&rawPosts)
	if err != nil {
		return nil, err
	}

	return rawPosts, nil
}

func getTaxemonyByID(taxonomy string, ids []int) []TaxemonyRaw {
	client := req.C().SetBaseURL(WORDPRESS_URL)

	// concat all ids into a comma seperated string
	var tagIds string
	for i, id := range ids {
		tagIds += fmt.Sprintf("%d", id)
		if i != len(ids)-1 {
			tagIds += ","
		}
	}

	var rawTags []TaxemonyRaw
	err := client.Get().SetURL(taxonomy).SetQueryParam("include", tagIds).SetQueryParam("per_page", "100").Do().Into(&rawTags)
	if err != nil {
		return nil
	}

	return rawTags
}

func rawToPost(post PostRaw) (database.Post, error) {
	postHtml := post.Content.Rendered
	postHtml = parseHtml(postHtml)

	postHtml, err := minifyHtml(postHtml)
	if err != nil {
		return database.Post{}, err
	}

	// get tags
	tags, _ := getTagsList(post.Tags)

	h := sha256.New()
	h.Write([]byte(post.ID.Rendered))
	id := fmt.Sprintf("%x", h.Sum(nil))

	// get featured image
	media := getMedia(post.FeaturedMedia)

	return database.Post{
		ID:            id,
		Title:         post.Title.Rendered,
		Created:       parseDate(post.ModifiedGMT),
		Updated:       parseDate(post.ModifiedGMT),
		Published:     parseDate(post.DateGMT),
		Slug:          post.Slug,
		Status:        post.Status,
		HTML:          postHtml,
		Excerpt:       post.Excerpt.Rendered,
		Tags:          tags,
		FeaturedImage: media.SourceURL,
		//Categories: getTaxemonyByID("categories", post.Categories),
	}, nil
}

func getMedia(id int) MediaRaw {
	client := req.C().SetBaseURL(WORDPRESS_URL)

	client.SetCommonBasicAuth("simon", "Cfef c6l0 1Rd3 btbG nj9e 4bxn")

	var media MediaRaw
	err := client.Get().SetURL(fmt.Sprintf("media/%d", id)).Do().Into(&media)
	if err != nil {
		return MediaRaw{}
	}

	return media
}

func getTagsList(tagIds []int) ([]string, error) {
	if len(tagIds) == 0 {
		return []string{}, nil
	}

	tags := getTaxemonyByID("tags", tagIds)

	// join tags into a comma seperated string
	tagNames := make([]string, len(tags))
	for i, tag := range tags {
		tagNames[i] = tag.Name
	}

	return tagNames, nil
}

func minifyHtml(input string) (string, error) {
	m := minify.New()
	m.AddFunc("text/html", html.Minify)

	s, err := m.String("text/html", input)
	if err != nil {
		return "", err
	}

	return s, nil
}

func parseDate(date string) time.Time {
	t, _ := time.Parse("2006-01-02T15:04:05", date)
	return t
}

func parseHtml(input string) string {
	// find all wp-block-code blocks and parse
	re := regexp.MustCompile(`(?s)<pre class="wp-block-code.*?>(.*?)</pre>`)
	input = re.ReplaceAllStringFunc(input, func(s string) string {
		// remove pre tags
		s = strings.Replace(s, "<pre class=\"wp-block-code\">", "", 1)
		s = strings.Replace(s, "</pre>", "", 1)

		// get value of lang attribute of code tag, e.g. <span lang="go" class="language-go">
		langRegex := regexp.MustCompile(`lang="([^"]+)"`)
		contentRegex := regexp.MustCompile(`<code[^>]*>([\s\S]*?)<\/code>`)

		langAttrValue := langRegex.FindStringSubmatch(s)
		content := contentRegex.FindStringSubmatch(s)

		if len(langAttrValue) == 2 && len(content) == 2 {
			sourceCode := content[1]
			lang := langAttrValue[1]

			lexer := lexers.Get(lang)

			if lexer == nil {
				lexer = lexers.Analyse(sourceCode)
			}

			if lexer == nil {
				log.Error().Str("lang", lang).Msg("failed to find lexer")
				lexer = lexers.Fallback
			}
			lexer = chroma.Coalesce(lexer)

			style := styles.Get("github-dark")
			if style == nil {
				style = styles.Fallback
			}
			formatter := chroma_html.New(chroma_html.WithClasses(true))

			iterator, err := lexer.Tokenise(nil, sourceCode)
			if err != nil {
				log.Error().Err(err).Msg("failed to tokenize code")
				return s
			}

			buf := new(bytes.Buffer)
			err = formatter.Format(buf, style, iterator)
			if err != nil {
				log.Error().Err(err).Msg("failed to highlight code")
				return s
			}

			return buf.String()
		}

		return s
	})

	return input
}
