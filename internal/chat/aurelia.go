package chat

import (
	"fmt"
	"time"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

var Aurelia Bot = Bot{
	SendMessage: AureliaHandleMessage,
	Name:        "Aurelia",
	Description: "Aurelia is a bot that can help you with your questions about the website.",
}

func AureliaHandleMessage(message string) (chan Message, error) {
	messageChan := make(chan Message)

	go func() {
		id, _ := gonanoid.New()

		messageChan <- Message{
			ID:       id,
			Content:  "Hey, how ya doin'? I'm Aurelia, ",
			User:     false,
			Datetime: fmt.Sprintf("%d", time.Now().UnixNano()),
		}

		time.Sleep(600 * time.Millisecond)

		messageChan <- Message{
			ID:       id,
			Content:  "Hey, how ya doin'? I'm Aurelia, the Golang and Typescript enthusiast from London.",
			User:     false,
			Datetime: fmt.Sprintf("%d", time.Now().UnixNano()),
		}

		close(messageChan)
	}()

	return messageChan, nil
}
