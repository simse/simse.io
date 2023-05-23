package chat

import gonanoid "github.com/matoous/go-nanoid/v2"

type Bot struct {
	SendMessage func(string) (chan Message, error)
	Name        string
	Description string
}

type Message struct {
	ID       string `json:"id"`
	Content  string `json:"content"`
	User     bool
	Datetime string
}

type Conversation struct {
	Bot      Bot
	Messages []Message `json:"messages"`
}

func (c *Conversation) HandleMessage(message string) (chan Message, error) {
	return c.Bot.SendMessage(message)
}

func (c *Conversation) AddMessage(message Message) {
	c.Messages = append(c.Messages, message)
}

func (c *Conversation) AddUserMessage(message string) {
	id, _ := gonanoid.New()

	c.AddMessage(Message{
		ID:      id,
		Content: message,
		User:    true,
	})
}
