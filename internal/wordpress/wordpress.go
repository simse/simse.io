package wordpress

import (
	"fmt"
	"time"

	"github.com/imroc/req/v3"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/html"
)

type PostRaw struct {
	ID    int `json:"id"`
	Title struct {
		Rendered string `json:"rendered"`
	} `json:"title"`
	Date    string `json:"date"`
	DateGMT string `json:"date_gmt"`
	Slug    string `json:"slug"`
	Status  string `json:"status"`
	Type    string `json:"type"`
	Content struct {
		Rendered string `json:"rendered"`
	} `json:"content"`
	Excerpt struct {
		Rendered string `json:"rendered"`
	} `json:"excerpt"`
	Tags       []int `json:"tags"`
	Categories []int `json:"categories"`
}

type Post struct {
	ID         int
	Title      string
	Date       time.Time
	Slug       string
	Status     string
	HTML       string
	Excerpt    string
	Tags       []TagRaw
	Categories []CategoryRaw
}

type TagRaw struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Slug        string `json:"slug"`
}

type CategoryRaw = TagRaw

var WORDPRESS_URL = "http://simse-wp.internal.sorensen.cloud/wp-json/wp/v2/"

func GetPosts() ([]Post, error) {
	client := req.C().SetBaseURL(WORDPRESS_URL)

	var rawPosts []PostRaw
	err := client.Get().SetURL("posts").Do().Into(&rawPosts)
	if err != nil {
		return nil, err
	}

	var posts []Post
	for _, post := range rawPosts {
		p, err := rawToPost(post)
		if err != nil {
			return nil, err
		}

		posts = append(posts, p)
	}

	return posts, nil
}

func GetPostByID(id int) (Post, error) {
	client := req.C().SetBaseURL(WORDPRESS_URL)

	var rawPost PostRaw
	err := client.Get().SetURL(fmt.Sprintf("posts/%d", id)).Do().Into(&rawPost)
	if err != nil {
		return Post{}, err
	}

	if rawPost.ID == 0 {
		return Post{}, fmt.Errorf("Post not found")
	}

	return rawToPost(rawPost)
}

func getTaxemonyByID(taxonomy string, ids []int) []TagRaw {
	client := req.C().SetBaseURL(WORDPRESS_URL)

	// concat all ids into a comma seperated string
	var tagIds string
	for i, id := range ids {
		tagIds += fmt.Sprintf("%d", id)
		if i != len(ids)-1 {
			tagIds += ","
		}
	}

	var rawTags []TagRaw
	err := client.Get().SetURL(taxonomy).SetQueryParam("include", tagIds).SetQueryParam("per_page", "100").Do().Into(&rawTags)
	if err != nil {
		return nil
	}

	return rawTags
}

func rawToPost(post PostRaw) (Post, error) {
	minifiedContent, err := minifyHtml(post.Content.Rendered)
	if err != nil {
		return Post{}, err
	}

	return Post{
		ID:         post.ID,
		Title:      post.Title.Rendered,
		Date:       parseDate(post.Date),
		Slug:       post.Slug,
		Status:     post.Status,
		HTML:       minifiedContent,
		Excerpt:    post.Excerpt.Rendered,
		Tags:       getTaxemonyByID("tags", post.Tags),
		Categories: getTaxemonyByID("categories", post.Categories),
	}, nil
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
