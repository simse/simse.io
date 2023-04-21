package tasks

import (
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/hibiken/asynq"
)

// ZerologAsynqLogger is a custom logger that implements asynq.Logger interface.
type ZerologAsynqLogger struct {
	logger zerolog.Logger
}

// NewZerologAsynqLogger creates a new ZerologAsynqLogger instance.
func NewZerologAsynqLogger(logger zerolog.Logger) *ZerologAsynqLogger {
	return &ZerologAsynqLogger{logger: logger}
}

// Debug implements asynq.Logger interface.
func (z *ZerologAsynqLogger) Debug(msg ...interface{}) {
	z.logger.Debug().Str("component", "asynq").Msgf("%v", msg)
}

// Info implements asynq.Logger interface.
func (z *ZerologAsynqLogger) Info(msg ...interface{}) {
	z.logger.Info().Str("component", "asynq").Msgf("%v", msg)
}

// Warn implements asynq.Logger interface.
func (z *ZerologAsynqLogger) Warn(msg ...interface{}) {
	z.logger.Warn().Str("component", "asynq").Msgf("%v", msg)
}

// Error implements asynq.Logger interface.
func (z *ZerologAsynqLogger) Error(msg ...interface{}) {
	z.logger.Error().Str("component", "asynq").Msgf("%v", msg)
}

// Fatal implements asynq.Logger interface.
func (z *ZerologAsynqLogger) Fatal(msg ...interface{}) {
	z.logger.Fatal().Str("component", "asynq").Msgf("%v", msg)
}

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
			Logger: NewZerologAsynqLogger(log.Logger),
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
