package handler

import (
	"fmt"
	"net/http"
	"time"
)

// Handler exports the serverless function
func Handler(w http.ResponseWriter, r *http.Request) {
	currentTime := time.Now().Format(time.RFC850)
	fmt.Fprintf(w, currentTime)
}
