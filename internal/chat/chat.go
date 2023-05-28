package chat

import gonanoid "github.com/matoous/go-nanoid/v2"

type Bot struct {
	SendMessage func(string, []Message) (chan Message, error)
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
	Done     bool      `json:"done"`
}

func (c *Conversation) HandleMessage(message string) (chan Message, error) {
	// nanoid
	//id, _ := gonanoid.New()

	/*c.Messages = append(c.Messages, Message{
		ID:      id,
		Content: message,
		User:    true,
	})*/

	return c.Bot.SendMessage(message, c.Messages)
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
