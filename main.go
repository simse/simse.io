package main

import (
	"os"

	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/database"
	"github.com/simse/simse.io/internal/server"
	"github.com/simse/simse.io/internal/tasks"

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

	if len(os.Args) < 2 {
		log.Fatal().Msg("missing argument")
	}

	// read argument from command line
	if os.Args[1] == "server" {
		// tasks.AddTask(tasks.NewSyncWordpressTask())

		server.StartServer()
	} else if os.Args[1] == "worker" {
		tasks.StartWorker()
	} else {
		log.Fatal().Msg("invalid argument")
	}
}
