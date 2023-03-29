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
		Message:   "Here's the latest article on simse.io. Enjoy reading! GE",
		Timestamp: time.Now(),
	}

	processedMessage := runtime.ProcessMessage(testMessage)

	processedMessage.PrettyPrint()*/
}
