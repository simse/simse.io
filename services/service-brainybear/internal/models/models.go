package models

import (
	"github.com/simse/simse.io/services/service-brainybear/internal/models/gpt4"
	"github.com/simse/simse.io/services/service-brainybear/internal/types"
)

type Model struct {
	Name          string
	Description   string
	HandleMessage func(types.Conversation, chan types.Message)
}

var Models = map[string]Model{
	"gpt-4": {
		Name:          "gpt-4",
		Description:   "",
		HandleMessage: gpt4.HandleMessage,
	},
}
