package server

import (
	"errors"
	"os"
)

type Meta struct {
	App          string `json:"app"`
	AllocationID string `json:"allocation_id"`
	Region       string `json:"region"`
	Primary      bool   `json:"primary"`
	Environment  string `json:"stage"`
}

var CurrentMeta Meta

func init() {
	if os.Getenv("FLY_APP_NAME") == "" {
		CurrentMeta.App = "simse-io-dev"
		CurrentMeta.AllocationID = "dev"
		CurrentMeta.Region = "king"
		CurrentMeta.Environment = "dev"
		// CurrentMeta.Primary = true
	} else {
		CurrentMeta.App = os.Getenv("FLY_APP_NAME")
		CurrentMeta.AllocationID = os.Getenv("FLY_ALLOCATION_ID")
		CurrentMeta.Region = os.Getenv("FLY_REGION")
		CurrentMeta.Environment = "prod"
		CurrentMeta.Primary = isPrimary()
	}
}

func isPrimary() bool {
	// return true if /litefs/.primary does not exist
	if _, err := os.Stat("/litefs/.primary"); errors.Is(err, os.ErrNotExist) {
		return true
	}

	return false
}
