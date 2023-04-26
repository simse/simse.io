package database

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/rs/zerolog/log"
	"github.com/simse/simse.io/internal/meta"
	_ "modernc.org/sqlite"
)

/*type Conn struct {
	Execute func() error
}*/

var Conn *sql.DB
var ReadonlyConn *sql.DB

var litefsPollRate = 100

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

func openReadonly() {
	db, err := sql.Open("sqlite", os.Getenv("STORAGE_PATH")+"/litefs/dbs/simse.db/database?mode=ro")
	if err != nil {
		panic(err)
	}

	ReadonlyConn = db
	if err != nil {
		panic(err)
	}
}

func Open() {
	openReadonly()
	log.Info().Msg("opened database readonly connection")
	go pollForLitefs()

	if meta.CurrentMeta.Environment == "prod" {
		go MountLitefs()
	}
}

func pollForLitefs() {
	if meta.CurrentMeta.Environment == "dev" {
		litefsPollRate = 1000
	}

	for {
		_, err := os.Stat(os.Getenv("DATABASE_URL"))
		if err == nil {
			break
		}

		log.Info().Str("wait", fmt.Sprintf("%d", litefsPollRate)).Msg("waiting for litefs to appear")
		time.Sleep(time.Duration(litefsPollRate) * time.Millisecond)
	}

	log.Info().Msg("litefs appears ready, opening connection")
	openConn()
	log.Info().Msg("opened database connection")

	ReadonlyConn.Close()
	log.Info().Msg("closed readonly connection")
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

func GetActiveConn() *sql.DB {
	if Conn == nil {
		return ReadonlyConn
	}

	return Conn
}
