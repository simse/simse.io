package database

import (
	"os"

	"github.com/asdine/storm/v3"
)

var DB *storm.DB

func InitDB() {
	db, err := storm.Open(os.Getenv("DB_FILE"))
	if err != nil {
		panic("could not open db")
	}

	DB = db
}
