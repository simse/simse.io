package main

import (
	"github.com/simse/simse.io/service/service-weight/internal/database"
	"github.com/simse/simse.io/service/service-weight/internal/server"
)

func init() {
	database.InitDB()
}

func main() {
	defer database.DB.Close()

	server.StartServer()
}
