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
	Entity    string    `json:"entity"` // user, model
	Timestamp time.Time `json:"timestamp"`
	Finished  bool      `json:"finished"`
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
}
