package main

import (
	"os"

	"github.com/rs/zerolog/log"

	"github.com/rs/zerolog"
	"github.com/simse/simse.io/internal/server"
)

func main() {
	// init logging
	if os.Getenv("FLY_APP_NAME") != "" {
		zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	} else {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}

	server.StartServer()
	//fmt.Println(wordpress.GetPostByID(21))
}
