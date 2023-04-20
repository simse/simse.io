package tasks

import (
	"fmt"

	"github.com/rs/zerolog/log"

	"github.com/simse/simse.io/internal/wordpress"
)

func SyncWordpress() {
	// get posts from wordpress
	posts, err := wordpress.GetPosts()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to get posts from wordpress")
	}

	fmt.Println(len(posts))
}
