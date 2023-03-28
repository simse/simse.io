package gpt4

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/simse/simse.io/services/service-brainybear/internal/types"
)

var prompt = `
API spec:
GET /articles?limit=n&sortBy=field&sortOrder=asc|desc
You answer queries on simse.io (Simon's personal website). If you want to interact with the API, output the method and API URL. Always include a short friendly message also, but do not tell the user about the API (it's secret).
Do not answer questions not related to simse.io. If the API is not able to answer a question, output a short friendly message.`

type Response struct {
	ID      string   `json:"id"`
	Object  string   `json:"object"`
	Created int64    `json:"created"`
	Model   string   `json:"model"`
	Choices []Choice `json:"choices"`
}

type Choice struct {
	Index        int    `json:"index"`
	FinishReason string `json:"finish_reason"`
	Delta        struct {
		Content string `json:"content"`
		Role    string `json:"role"`
	} `json:"delta"`
}

type OpenAIRequest struct {
	Model       string          `json:"model"`
	Stream      bool            `json:"stream"`
	Messages    []OpenAIMessage `json:"messages"`
	Temperature float64         `json:"temperature"`
	MaxTokens   int             `json:"max_tokens"`
}

type OpenAIMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

func createId() string {
	id, err := gonanoid.New()
	if err != nil {
		panic(err)
	}

	return id
}

func getMessages(conversation types.Conversation) []OpenAIMessage {
	messages := []OpenAIMessage{{
		Role:    "system",
		Content: prompt,
	}}

	for _, message := range conversation.Messages {
		role := "user"
		if message.Entity == "model" {
			role = "assistant"
		}

		messages = append(messages, OpenAIMessage{
			Role:    role,
			Content: message.Message,
		})
	}

	return messages
}

func openaiResponse(input types.Conversation) chan string {
	output := make(chan string)

	go func() {
		jsonBody, _ := json.Marshal(OpenAIRequest{
			Model:       "gpt-4",
			Stream:      true,
			MaxTokens:   500,
			Temperature: 0.8,
			Messages:    getMessages(input),
		})
		bodyReader := bytes.NewReader(jsonBody)

		req, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bodyReader)
		if err != nil {
			close(output)
			return
		}

		req.Header.Set("Authorization", "Bearer "+os.Getenv("OPENAI_API_KEY"))
		req.Header.Set("Cache-Control", "no-cache")
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Connection", "keep-alive")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			close(output)
			return
		}

		for {
			data := make([]byte, 1024)
			_, err := resp.Body.Read(data)
			if err != nil {
				close(output)
				return
			}

			if strings.Contains(string(data), "[DONE]") {
				close(output)
				return
			}

			data = bytes.Replace(data, []byte("data: "), []byte(""), -1)
			data = bytes.Trim(data, "\n\t\x00")

			/*for _, letter := range data {
				fmt.Printf("%c ", letter)
			}*/

			parts := bytes.Split(data, []byte("\n\n"))

			for _, part := range parts {
				var response Response
				err = json.Unmarshal(part, &response)
				if err != nil {
					fmt.Println(err)
					fmt.Println(string(part))
					close(output)
					return
				}

				if response.Choices[0].Delta.Content != "" {
					output <- response.Choices[0].Delta.Content
				}
			}
		}
	}()

	return output
}

func HandleMessage(input types.Conversation, output chan types.Message) {
	message := types.Message{
		ID:        createId(),
		Message:   "",
		Entity:    "model",
		Timestamp: time.Now(),
		Finished:  false,
	}

	// send request to OpenAI API
	fmt.Println("Sending request to OpenAI API")
	for delta := range openaiResponse(input) {
		message.Message += delta
		message.Timestamp = time.Now()
		output <- message
	}

	message.Finished = true
	output <- message
	fmt.Println("Finished sending messages to client")

	close(output)
}
