package main

import (
	"os"

	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/database"
	"github.com/simse/simse.io/internal/server"

	"github.com/rs/zerolog"
)

func main() {
	// init logging
	if os.Getenv("FLY_APP_NAME") != "" {
		zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	} else {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}

	database.Open()

	server.StartServer()
	//fmt.Println(wordpress.GetPostByID(21))
	/*err := database.InsertPost(database.Post{
		Title:     "test 2",
		HTML:      "<h1>hello world</h1>",
		Slug:      "test-2",
		Excerpt:   "an excerpt",
		Created:   time.Now(),
		Updated:   time.Now(),
		Published: time.Now(),
		Status:    "published",
	})
	if err != nil {
		log.Fatal().Err(err).Msg("failed to insert post")
	}*/
	/*posts, err := database.GetPosts()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to get posts")
	}

	log.Info().Interface("posts", posts).Msg("posts")*/
}
