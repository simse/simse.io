package output

import (
	"math"
	"sort"
	"time"

	"github.com/simse/simse.io/service/service-weight/internal/database"
)

type NanoMetric struct {
	Timestamp time.Time `json:"timestamp"`
	Value     float64   `json:"value"`
}

func GetSummary() map[string][]NanoMetric {
	metricKeys := []string{"dietary_energy", "step_count", "weight_body_mass"}
	summary := make(map[string][]NanoMetric)

	for _, k := range metricKeys {
		summary[k] = SummariseMetricKey(k)
	}

	return summary
}

func SummariseMetricKey(key string) []NanoMetric {
	var metrics []database.Metric
	database.DB.Find("Name", key, &metrics)

	nanoMetrics := []NanoMetric{}

	for _, m := range metrics {
		// convert kJ to kcal
		if key == "dietary_energy" {
			m.Value = m.Value * 0.239006
		}

		nanoMetrics = append(nanoMetrics, NanoMetric{
			Timestamp: m.Timestamp,
			Value:     math.Round(m.Value*100) / 100,
		})
	}

	sort.Slice(nanoMetrics, func(i, j int) bool {
		return nanoMetrics[i].Timestamp.Before(nanoMetrics[j].Timestamp)
	})

	return nanoMetrics
}
