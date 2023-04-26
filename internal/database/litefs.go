package database

import (
	"bufio"
	"io"
	"os"
	"os/exec"
	"sync"

	"github.com/rs/zerolog/log"
)

func MountLitefs() {
	cmd := exec.Command("./bin/litefs", "mount")

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		log.Fatal().Err(err).Msg("error getting stdout pipe")
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		log.Fatal().Err(err).Msg("error getting stderr pipe")
	}

	if err := cmd.Start(); err != nil {
		log.Fatal().Err(err).Msg("error starting litefs")
	}

	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		reader := bufio.NewReader(stdout)
		for {
			line, err := reader.ReadString('\n')
			if err != nil {
				if err != io.EOF {
					log.Error().Err(err).Msg("error reading stdout")
				}
				break
			}
			line = line[:len(line)-1]
			log.Info().Str("component", "litefs").Msg(line)
		}
	}()

	go func() {
		defer wg.Done()
		reader := bufio.NewReader(stderr)
		for {
			line, err := reader.ReadString('\n')
			if err != nil {
				if err != io.EOF {
					log.Error().Err(err).Msg("error reading stderr")
				}
				break
			}
			line = line[:len(line)-1]
			log.Info().Str("component", "litefs").Msg(line)
		}
	}()

	wg.Wait()

	if err := cmd.Wait(); err != nil {
		if exitError, ok := err.(*exec.ExitError); ok {
			os.Exit(exitError.ExitCode())
		} else {
			log.Fatal().Err(err).Msg("error waiting for litefs")
		}
	}
}
