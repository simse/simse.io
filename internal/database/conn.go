package database

import (
	"database/sql"
	"os"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/rs/zerolog/log"
	_ "modernc.org/sqlite"
)

/*type Conn struct {
	Execute func() error
}*/

var Conn *sql.DB

func openConn() {
	db, err := sql.Open("sqlite", os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	Conn = db

	_, err = db.Exec("PRAGMA journal_mode=WAL;")
	if err != nil {
		panic(err)
	}
}

func Open() {
	openConn()
	// runMigrations()
}

func RunMigrations() {
	driver, err := sqlite.WithInstance(Conn, &sqlite.Config{})
	if err != nil {
		panic(err)
	}

	m, err := migrate.NewWithDatabaseInstance("file://migrations", "sqlite", driver)
	if err != nil {
		panic(err)
	}

	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		panic(err)
	}

	log.Info().Msg("migrations ran successfully")
}
