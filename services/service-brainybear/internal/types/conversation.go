package types

import (
	"fmt"
	"time"
)

type Conversation struct {
	ID       string    `json:"id"`
	Messages []Message `json:"messages"`
	Model    string    `json:"model"`
}

type Message struct {
	ID        string    `json:"id"`
	Message   string    `json:"message"`
	Cards     []Card    `json:"cards"`
	Entity    string    `json:"entity"` // user, model
	Timestamp time.Time `json:"timestamp"`
	Finished  bool      `json:"finished"`
}

type Card struct {
	Title string `json:"title"`
	Body  string `json:"body"`
	URL   string `json:"url"`
	Image string `json:"image"`
}

func (c *Conversation) AddMessage(m Message) {
	// check if message already exists and if so, replace it
	for i, message := range c.Messages {
		if message.ID == m.ID {
			c.Messages[i] = m
			return
		}
	}

	c.Messages = append(c.Messages, m)
}

func (c *Conversation) LastMessage() Message {
	return c.Messages[len(c.Messages)-1]
}

func (m *Message) PrettyPrint() {
	fmt.Printf("%s: %s\n", m.Entity, m.Message)
	for _, card := range m.Cards {
		fmt.Printf("Card: %s\n", card.Title)
		fmt.Printf("Body: %s\n", card.Body)
		fmt.Printf("URL: %s\n", card.URL)
		fmt.Printf("Image: %s\n", card.Image)
	}
}
