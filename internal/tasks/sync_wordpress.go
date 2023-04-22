package tasks

import (
	"strings"

	"github.com/rs/zerolog/log"
	"golang.org/x/net/html"

	"github.com/simse/simse.io/internal/database"
	"github.com/simse/simse.io/internal/wordpress"
)

func SyncWordpress() error {
	log.Info().Msg("syncing Wordpress with database...")
	// get posts from wordpress
	posts, err := wordpress.GetPosts()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to get posts from wordpress")
	}

	for _, post := range posts {
		post.Excerpt, _ = extractTextContent(post.Excerpt)
		err = database.InsertPost(post)
		if err != nil {
			log.Error().Err(err).Str("title", post.Title).Msg("failed to insert post into database")
		}
	}

	log.Info().Msg("successfully synced Wordpress with database")

	return nil
}

func extractTextContent(htmlString string) (string, error) {
	reader := strings.NewReader(htmlString)
	doc, err := html.Parse(reader)
	if err != nil {
		return "", err
	}

	var textContent strings.Builder
	var f func(*html.Node)
	f = func(n *html.Node) {
		if n.Type == html.TextNode {
			textContent.WriteString(n.Data)
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}
	f(doc)

	return strings.TrimSpace(textContent.String()), nil
}
