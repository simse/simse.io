package runtime

import (
	"fmt"
	"strings"
	"time"

	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/simse/simse.io/services/service-brainybear/internal/models/gpt4"
	"github.com/simse/simse.io/services/service-brainybear/internal/types"
)

var Conversations map[string]types.Conversation = make(map[string]types.Conversation)

func NewConversation() types.Conversation {
	id := createId()

	conversation := types.Conversation{
		ID:       id,
		Model:    "gpt-4",
		Messages: []types.Message{},
	}

	Conversations[id] = conversation

	return conversation
}

func createId() string {
	id, err := gonanoid.New()
	if err != nil {
		panic(err)
	}

	return id
}

func HandleMessage(message string, conversation types.Conversation, output chan types.Message) {
	// add message to conversation
	conversation.AddMessage(types.Message{
		ID:        createId(),
		Entity:    "user",
		Message:   message,
		Timestamp: time.Now(),
	})

	// send message back to model if last message contains GET
	var repeat bool = true

	for repeat {
		fmt.Println("starting request to model")

		// intercept channel
		intercept := make(chan types.Message)

		go gpt4.HandleMessage(conversation, intercept)

		for msg := range intercept {
			processedMessage := ProcessMessage(msg)

			conversation.AddMessage(processedMessage)
			output <- processedMessage
		}

		repeat = strings.Contains(conversation.LastMessage().Message, "GET")
	}

	close(output)
}
