package server

import (
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/simse/simse.io/service/service-weight/internal/database"
)

func StartServer() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.POST("/", func(c *gin.Context) {
		// verify password
		if c.Request.Header.Get("X-Password") != os.Getenv("INGEST_PASSWORD") {
			c.JSON(http.StatusForbidden, gin.H{
				"message": "MISSING/INCORRECT PASSWORD",
			})

			return
		}

		jsonData, err := ioutil.ReadAll(c.Request.Body)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "ERROR",
			})

			return
		}

		// fmt.Println(string(jsonData))
		database.IngestAppleHealthData(jsonData)

		c.JSON(http.StatusOK, gin.H{
			"message": "OK",
		})
	})

	r.GET("/healthcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "OK",
		})
	})

	r.GET("/all", func(c *gin.Context) {
		var metrics []database.Metric

		database.DB.All(&metrics)

		c.JSON(http.StatusOK, metrics)
	})

	r.GET("/grouped", func(c *gin.Context) {
		var metrics []database.Metric
		database.DB.All(&metrics)

		grouped := make(map[string][]database.Metric)

		for _, metric := range metrics {
			grouped[metric.Name] = append(grouped[metric.Name], metric)
		}

		c.JSON(http.StatusOK, grouped)
	})

	r.Run(":8080")
}
