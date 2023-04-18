package main

import (
	"fmt"

	"github.com/simse/simse.io/internal/wordpress"
)

func main() {
	// server.StartServer()
	fmt.Println(wordpress.GetPostByID(21))
}
