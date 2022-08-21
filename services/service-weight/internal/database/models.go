package database

import "time"

type Metric struct {
	ID        string    `json:"id" storm:"unique"`
	Timestamp time.Time `json:"timestamp"`
	Name      string    `json:"name"`
	Unit      string    `json:"unit"`
	Value     float64   `json:"value"`
}
