package database

import (
	"crypto/sha256"
	"fmt"
	"time"

	"github.com/araddon/dateparse"
	"github.com/valyala/fastjson"
)

func IngestAppleHealthData(data []byte) error {
	var p fastjson.Parser
	v, err := p.ParseBytes(data)

	if err != nil {
		return err
	}

	for _, metric := range v.GetArray("data", "metrics") {
		metricName := string(metric.GetStringBytes("name"))
		metricUnit := string(metric.GetStringBytes("units"))

		// parse data
		for _, dataPoint := range metric.GetArray("data") {
			metricTimestamp, _ := dateparse.ParseAny(string(dataPoint.GetStringBytes("date")))
			metricValue := dataPoint.GetFloat64("qty")

			point := Metric{
				ID:        generateMetricId(metricName, metricValue, metricTimestamp),
				Name:      metricName,
				Unit:      metricUnit,
				Timestamp: metricTimestamp,
				Value:     metricValue,
			}

			DB.Save(&point)
			fmt.Printf("saved new datapoint name=%s timestamp=%s\n", metricName, string(dataPoint.GetStringBytes("date")))
		}
	}

	return nil
}

func generateMetricId(name string, value float64, timestamp time.Time) string {
	concattedString := fmt.Sprintf("%s:%s", name, timestamp.String())
	sha256 := sha256.Sum256([]byte(concattedString))

	return fmt.Sprintf("%x", sha256)
}
