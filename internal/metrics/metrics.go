package metrics

import (
	"fmt"
	"strings"

	"github.com/imroc/req/v3"
	"github.com/rs/zerolog/log"
)

type PepyResponse struct {
	ID             string `json:"id"`
	TotalDownloads int    `json:"total_downloads"`
}

func GetPypiDownloads(name string) int {
	url := fmt.Sprintf("https://api.pepy.tech/api/v2/projects/%s", name)

	client := req.C()
	resp, err := client.R().Get(url)

	if err != nil {
		log.Error().Err(err).Msg("failed to get PyPI downloads")
		return 0
	}

	var pepyResponse PepyResponse
	err = resp.Into(&pepyResponse)

	if err != nil {
		log.Error().Err(err).Msg("failed to parse PyPI downloads")
		return 0
	}

	return pepyResponse.TotalDownloads
}

type DockerHubResponse struct {
	PullCount int `json:"pull_count"`
}

func GetDockerHubDownloads(name string) int {
	url := fmt.Sprintf("https://hub.docker.com/v2/repositories/simsemand/%s", name)

	client := req.C()
	resp, err := client.R().Get(url)

	if err != nil {
		log.Error().Err(err).Msg("failed to get Docker Hub downloads")
		return 0
	}

	var dockerHubResponse DockerHubResponse
	err = resp.Into(&dockerHubResponse)

	if err != nil {
		log.Error().Err(err).Msg("failed to parse Docker Hub downloads")
		return 0
	}

	return dockerHubResponse.PullCount
}

func ParseDownloadsStat(stat string) int {
	parts := strings.Split(stat, ":")
	provider := parts[0]
	query := parts[1]

	if provider == "pypi" {
		return GetPypiDownloads(query)
	}

	if provider == "dockerhub" {
		return GetDockerHubDownloads(query)
	}

	return 0
}
