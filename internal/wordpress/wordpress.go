package wordpress

import (
	"crypto/sha256"
	"fmt"
	"time"

	"github.com/imroc/req/v3"
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
	Tags       []int `json:"tags"`
	Categories []int `json:"categories"`
}

type TaxemonyRaw struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Slug        string `json:"slug"`
}

var WORDPRESS_URL = "https://simse-wp.sorensen.cloud/wp-json/wp/v2/"

func GetPosts() ([]database.Post, error) {
	client := req.C().SetBaseURL(WORDPRESS_URL)

	client.SetCommonBasicAuth("simon", "jNCLfXUHnC5PuSkdniFtb8Jvv64ZcRosbu9Brq7LJG7g7hMrzt8yCfCfEV6eKyBBM")

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
	minifiedContent, err := minifyHtml(post.Content.Rendered)
	if err != nil {
		return database.Post{}, err
	}

	// get tags
	tags, _ := getTagsList(post.Tags)

	h := sha256.New()
	h.Write([]byte(post.ID.Rendered))
	id := fmt.Sprintf("%x", h.Sum(nil))

	return database.Post{
		ID:        id,
		Title:     post.Title.Rendered,
		Created:   parseDate(post.ModifiedGMT),
		Updated:   parseDate(post.ModifiedGMT),
		Published: parseDate(post.DateGMT),
		Slug:      post.Slug,
		Status:    post.Status,
		HTML:      minifiedContent,
		Excerpt:   post.Excerpt.Rendered,
		Tags:      tags,
		//Categories: getTaxemonyByID("categories", post.Categories),
	}, nil
}

func getTagsList(tagIds []int) ([]string, error) {
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
