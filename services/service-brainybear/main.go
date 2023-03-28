package main

import (
	"github.com/joho/godotenv"
	"github.com/simse/simse.io/services/service-brainybear/internal/server"
)

func main() {
	// load .env
	godotenv.Load()

	server.Start()

	/*testMessage := types.Message{
		ID:        "123",
		Entity:    "assistant",
		Message:   "DISPLAY /articles?limit=1\u0026sortBy=date&sortOrder=desc Here's the latest article on simse.io. Enjoy reading!",
		Timestamp: time.Now(),
	}

	processedMessage := runtime.ProcessMessage(testMessage)

	processedMessage.PrettyPrint()*/
}
