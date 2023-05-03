package server

import (
	"encoding/xml"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/simse/simse.io/internal/database"
)

type URL struct {
	Loc        string `xml:"loc"`
	LastMod    string `xml:"lastmod,omitempty"`
	ChangeFreq string `xml:"changefreq,omitempty"`
	Priority   string `xml:"priority,omitempty"`
}

type Sitemap struct {
	XMLName xml.Name `xml:"urlset"`
	Xmlns   string   `xml:"xmlns,attr"`
	URLs    []URL    `xml:"url"`
}

func GenerateSitemap(urls []URL) ([]byte, error) {
	var sitemap Sitemap
	sitemap.Xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9"

	for _, url := range urls {
		sitemap.URLs = append(sitemap.URLs, URL{Loc: "https://" + os.Getenv("SIMSE_IO_HOST") + "/" + url.Loc, LastMod: url.LastMod, ChangeFreq: url.ChangeFreq, Priority: url.Priority})
	}

	output, err := xml.MarshalIndent(sitemap, "", "  ")
	if err != nil {
		return nil, err
	}

	return output, nil
}

func sitemapHandler(c *fiber.Ctx) error {
	urls := make([]URL, 0)

	// static URLs
	urls = append(urls, URL{Loc: "", ChangeFreq: "weekly", Priority: "1.0"})
	urls = append(urls, URL{Loc: "posts", ChangeFreq: "weekly", Priority: "0.8"})
	urls = append(urls, URL{Loc: "projects", ChangeFreq: "monthly", Priority: "0.6"})

	// add posts
	posts, err := database.GetPosts()
	if err != nil {
		return err
	}

	for _, post := range posts {
		urls = append(urls, URL{Loc: "posts/" + post.Slug, LastMod: post.Updated.Format("2006-01-02"), ChangeFreq: "monthly"})
	}

	// generate sitemap XML
	sitemap, err := GenerateSitemap(urls)
	if err != nil {
		return err
	}

	c.Set("Content-Type", "application/xml")
	return c.Send(sitemap)
}
