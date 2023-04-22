package main

import (
	"flag"
	"os"

	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/database"
	"github.com/simse/simse.io/internal/server"

	"github.com/rs/zerolog"
)

func main() {
	// parse flags
	primaryOverride := flag.Bool("primary", false, "a bool")
	flag.Parse()
	if *primaryOverride {
		server.CurrentMeta.Primary = true
	}

	// init logging
	if server.CurrentMeta.Environment == "prod" {
		zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	} else {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}

	// output info about the current allocation
	log.Info().Str("region", server.CurrentMeta.Region).Str("app", server.CurrentMeta.App).Str("allocation_id", server.CurrentMeta.AllocationID).Str("environment", server.CurrentMeta.Environment).Bool("primary", server.CurrentMeta.Primary).Msg("app started")

	// if primary, disable timeout because the database must be available
	if server.CurrentMeta.Primary {
		log.Info().Msg("disabling timeout")
		server.TimeoutEnabled = false
	}

	// open database connection, and if primary run migrations
	database.Open()
	if server.CurrentMeta.Primary {
		database.RunMigrations()
	}

	server.StartServer()
}
