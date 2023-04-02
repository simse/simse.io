package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/simse/simse.io/services/service-brainybear/internal/runtime"
	"github.com/simse/simse.io/services/service-brainybear/internal/types"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Message struct {
	Message string `json:"message"`
}

func createId() string {
	id, err := gonanoid.New()
	if err != nil {
		panic(err)
	}

	return id
}

func ws(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()

	// create conversation for this connection
	conversation := runtime.NewConversation()
	c.WriteJSON(types.Message{
		ID:        conversation.ID,
		Entity:    "overlord",
		Message:   "conversation created",
		Timestamp: time.Now(),
	})

	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		var decodedMessage Message
		err = json.Unmarshal(message, &decodedMessage)
		if err != nil {
			log.Println("json:", err)
			break
		}

		if decodedMessage.Message == "" {
			fmt.Println("empty message")
			continue
		}

		conversation.AddMessage(types.Message{
			ID:        createId(),
			Entity:    "user",
			Message:   decodedMessage.Message,
			Timestamp: time.Now(),
		})

		var output chan types.Message = make(chan types.Message)

		go runtime.HandleMessage(decodedMessage.Message, conversation, output)

		for msg := range output {
			conversation.AddMessage(msg)
			err = c.WriteJSON(msg)
			if err != nil {
				log.Println("write:", err)
				break
			}
		}
	}
}

func Start() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// return JSON with msg OK
		w.Write([]byte("OK"))

	})
	http.HandleFunc("/chat", ws)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
