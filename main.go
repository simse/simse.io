package main

import (
	"flag"
	"os"

	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/database"
	"github.com/simse/simse.io/internal/meta"
	"github.com/simse/simse.io/internal/server"

	"github.com/rs/zerolog"
)

func main() {
	// parse flags
	primaryOverride := flag.Bool("primary", false, "a bool")
	flag.Parse()
	if *primaryOverride {
		meta.CurrentMeta.Primary = true
	}

	// init logging
	if meta.CurrentMeta.Environment == "prod" {
		zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	} else {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}

	// output info about the current allocation
	log.Info().Str("region", meta.CurrentMeta.Region).Str("app", meta.CurrentMeta.App).Str("allocation_id", meta.CurrentMeta.AllocationID).Str("environment", meta.CurrentMeta.Environment).Msg("app started")

	// if primary, disable timeout because the database must be available
	/*if meta.CurrentMeta.Region == "lhr" {
		log.Info().Msg("disabling timeout")
		server.TimeoutEnabled = false
	}*/

	// open database connection
	database.Open()

	server.StartServer()
}
