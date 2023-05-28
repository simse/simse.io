package server

import (
	"context"
	"time"

	"github.com/jfyne/live"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/chat"
	"github.com/simse/simse.io/internal/livefiber"
)

// temp storage for chat sessions
var chatSessions = map[string]*chat.Conversation{}

var frontpageHandler = live.NewHandler(livefiber.WithViewsRenderer("pages/index"))

func newChat(s live.Socket) *chat.Conversation {
	c, ok := s.Assigns().(*chat.Conversation)
	if ok {
		return c
	}

	// get session key
	sessionKeyValue, ok := s.Session()["_lsid"]
	sessionKey := ""
	if ok {
		sessionKey = sessionKeyValue.(string)
	}

	// check if session exists
	c, ok = chatSessions[sessionKey]
	if ok {
		log.Debug().Str("session", sessionKey).Msg("found existing chat session")
		return c
	}

	log.Debug().Str("session", sessionKey).Str("bot", "aurelia").Msg("creating new chat")
	conversation := &chat.Conversation{
		Bot:  chat.Aurelia,
		Done: false,
		Messages: []chat.Message{
			{
				ID:      "first_message",
				Content: "Hi there, unfortunately I'm in a terrible mood today. Anyway, I'm Simon Sorensen, a software engineering intern living in London.",
				User:    false,
			},
		},
	}

	chatSessions[sessionKey] = conversation

	return conversation
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
			ID:        id,
			Content:   p.String("message"),
			User:      true,
			Timestamp: time.Now(),
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

		//log.Debug().Str("bot", conversation.Bot.Name).Msg("handling newmessage event")

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

		if len(conversation.Messages) > 13 {
			conversation.Done = true
		}

		//log.Debug().Bool("replaced_message", replacedMessage).Str("bot", "aurelia").Msg("updated conversation")

		return conversation, nil
	})
}
