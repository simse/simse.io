package chat

type Bot struct {
	SendMessage func(string) (BotMessage, error)
	Name        string
	Description string
}

type BotMessage struct {
	Content string `json:"content"`
}
