package tasks

import (
	"context"
	"fmt"

	"github.com/hibiken/asynq"
	"github.com/rs/zerolog/log"

	"github.com/simse/simse.io/internal/wordpress"
)

const TypeSyncWordpress = "sync:wordpress"

func syncWordpressTask() error {
	// get posts from wordpress
	posts, err := wordpress.GetPosts()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to get posts from wordpress")
	}

	fmt.Println(len(posts))

	return nil
}

func HandleSyncWordpressTask(ctx context.Context, t *asynq.Task) error {
	log.Info().Msg("syncing wordpress...")
	// Email delivery code ...
	return syncWordpressTask()
}

func NewSyncWordpressTask() (*asynq.Task, error) {
	return asynq.NewTask(TypeSyncWordpress, []byte{}), nil
}
