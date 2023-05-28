package chat

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"time"

	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/rs/zerolog/log"
	"github.com/sashabaranov/go-openai"
	"github.com/simse/simse.io/internal/meta"
)

var Aurelia Bot = Bot{
	SendMessage: AureliaHandleMessage,
	Name:        "Aurelia",
	Description: "Aurelia is a bot that can help you with your questions about the website.",
}

var AURELIA_SYSTEM_PROMPT = `You are a software engineer called Simon Sorensen. Answers all question in one concise sentence. Be extremely rude and passive aggressive.
About you:
- I live in London
- I was born in Denmark
- I am 22 years old
- I work at LEGO on one of the lego.com teams
- I love Golang and Typescript
- My website is called simse.io
- I have a degree in Computer Science from Bruh University
- I love space and sci fi movies
- I do not have pets, but used to have a dog I miss very much
- I like playing games such as Diablo 4

Banned phrases (do not use these): "As an AI language model", "oh look at you", "ah", "bravo", "oh". Be kind towards LEGO.

Greet the user, and pick only two facts to share. Tell the user that you're in a rotten mood.`

var AURELIA_MAX_HISTORY = 4

func AureliaHandleMessage(message string, history []Message) (chan Message, error) {
	// fmt.Println(historyToOpenAIMessages(history))

	c := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
	ctx := context.Background()

	messageChan := make(chan Message)

	go func() {
		id, _ := gonanoid.New()

		model := openai.GPT3Dot5Turbo
		if meta.CurrentMeta.Environment == "prod" {
			model = openai.GPT4
		}

		req := openai.ChatCompletionRequest{
			Model:       model,
			MaxTokens:   200,
			Messages:    historyToOpenAIMessages(history),
			Stream:      true,
			Temperature: 0.6,
		}
		stream, err := c.CreateChatCompletionStream(ctx, req)
		if err != nil {
			fmt.Printf("ChatCompletionStream error: %v\n", err)
			return
		}
		defer stream.Close()

		//fmt.Printf("Stream response: ")
		buffer := ""
		for {
			response, err := stream.Recv()
			if errors.Is(err, io.EOF) {
				//fmt.Println("\nStream finished")
				break
			}

			if err != nil {
				//fmt.Printf("\nStream error: %v\n", err)
				log.Error().Err(err).Msg("openai stream error")
				break
			}

			buffer += response.Choices[0].Delta.Content
			messageChan <- Message{
				ID:       id,
				Content:  buffer,
				User:     false,
				Datetime: fmt.Sprintf("%d", time.Now().UnixNano()),
			}
		}

		defer close(messageChan)
	}()

	return messageChan, nil
}

func historyToOpenAIMessages(history []Message) []openai.ChatCompletionMessage {
	// loop throw last 4 messages
	if len(history) > AURELIA_MAX_HISTORY {
		history = history[len(history)-AURELIA_MAX_HISTORY:]
	}

	messages := make([]openai.ChatCompletionMessage, len(history)+1)

	messages[0] = openai.ChatCompletionMessage{
		Role:    openai.ChatMessageRoleSystem,
		Content: AURELIA_SYSTEM_PROMPT,
	}

	for i, message := range history {
		role := openai.ChatMessageRoleUser
		if !message.User {
			role = openai.ChatMessageRoleAssistant
		}

		content := message.Content

		if message.User {
			if len(content) > 100 {
				content = "<long message>"
			}

			if len(content) > 400 {
				content = "<very long message>"
			}
		}

		messages[i+1] = openai.ChatCompletionMessage{
			Role:    role,
			Content: content,
		}
	}

	// fmt.Println(messages)
	//fmt.Println(len(messages))

	return messages
}
