package server

import (
	"context"
	"fmt"
	"time"

	"github.com/jfyne/live"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/chat"
	"github.com/simse/simse.io/internal/livefiber"
)

type Chat struct {
	Test string
}

var frontpageHandler = live.NewHandler(livefiber.WithViewsRenderer("pages/index"))

func newChat(s live.Socket) *chat.Conversation {
	c, ok := s.Assigns().(*chat.Conversation)
	if !ok {
		log.Debug().Str("bot", "aurelia").Msg("creating new chat")
		return &chat.Conversation{
			Bot: chat.Aurelia,
			Messages: []chat.Message{
				{
					ID:      "first_message",
					Content: "Hey, how ya doin'? I'm Simon Sorensen, the Golang and Typescript enthusiast from London. I also love space and sci fi movies.",
					User:    false,
				},
			},
		}
	}
	return c
}

func init() {
	frontpageHandler.HandleMount(func(ctx context.Context, s live.Socket) (interface{}, error) {
		return newChat(s), nil
	})

	frontpageHandler.HandleEvent("send-message", func(ctx context.Context, s live.Socket, p live.Params) (interface{}, error) {
		conversation := s.Assigns().(*chat.Conversation)
		log.Debug().Str("bot", conversation.Bot.Name).Msg("handling send event")

		id, _ := gonanoid.New()
		s.Self(ctx, "newmessage", chat.Message{
			ID:       id,
			Content:  p.String("message"),
			User:     true,
			Datetime: fmt.Sprintf("%d", time.Now().UnixNano()),
		})

		messageChan, err := conversation.HandleMessage(p.String("message"))

		if err != nil {
			return nil, err
		}

		for message := range messageChan {
			s.Self(ctx, "newmessage", message)
		}

		return s.Assigns(), nil
	})

	frontpageHandler.HandleSelf("newmessage", func(ctx context.Context, s live.Socket, data interface{}) (interface{}, error) {
		conversation := s.Assigns().(*chat.Conversation)

		log.Debug().Str("bot", conversation.Bot.Name).Msg("handling newmessage event")

		// find and replace message based on id
		message := data.(chat.Message)
		replacedMessage := false
		for i, m := range conversation.Messages {
			if m.ID == message.ID {
				conversation.Messages[i] = message
				replacedMessage = true
				break
			}
		}

		// if message was not replaced, append it
		if !replacedMessage {
			conversation.Messages = append(conversation.Messages, message)
		}

		log.Debug().Bool("replaced_message", replacedMessage).Str("bot", "aurelia").Msg("updated conversation")

		return conversation, nil
	})
}
