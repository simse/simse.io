package tasks

import (
	"os"

	"github.com/rs/zerolog/log"

	"github.com/hibiken/asynq"
)

func StartWorker() {
	srv := asynq.NewServer(
		asynq.RedisClientOpt{Addr: os.Getenv("REDIS_URL"), DB: 1},
		asynq.Config{
			// Specify how many concurrent workers to use
			Concurrency: 10,
			// Optionally specify multiple queues with different priority.
			Queues: map[string]int{
				"critical": 6,
				"default":  3,
				"low":      1,
			},
			// See the godoc for other configuration options
		},
	)

	// mux maps a type to a handler
	mux := asynq.NewServeMux()
	mux.HandleFunc(TypeSyncWordpress, HandleSyncWordpressTask)

	if err := srv.Run(mux); err != nil {
		log.Fatal().Err(err).Msg("failed to run server")
	}
}

func AddTask(task *asynq.Task, newTaskErr error) error {
	if newTaskErr != nil {
		return newTaskErr
	}

	r := asynq.RedisClientOpt{Addr: os.Getenv("REDIS_URL"), DB: 1}
	client := asynq.NewClient(r)
	defer client.Close()

	_, err := client.Enqueue(task)
	if err != nil {
		return err
	}

	return nil
}
