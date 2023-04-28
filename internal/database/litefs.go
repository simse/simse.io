package database

import (
	"bufio"
	"context"
	"io"
	"os"
	"os/exec"
	"os/signal"
	"sync"
	"syscall"

	"github.com/rs/zerolog/log"
)

func readOutput(reader io.Reader, component string) {
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		log.Info().Str("component", component).Msg(scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		log.Error().Err(err).Msgf("error reading %s", component)
	}
}

func MountLitefs() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	cmd := exec.CommandContext(ctx, "./bin/litefs", "mount")

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
		readOutput(stdout, "litefs stdout")
	}()

	go func() {
		defer wg.Done()
		readOutput(stderr, "litefs stderr")
	}()

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt, syscall.SIGINT)
	go func() {
		sig := <-sigCh
		log.Info().Msg("received interrupt, killing litefs")
		if err := cmd.Process.Signal(sig); err != nil {
			log.Error().Err(err).Msg("error sending signal to subprocess")
		}
		os.Exit(1)
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
