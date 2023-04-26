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

func openConn() error {
	db, err := sql.Open("sqlite", "/litefs/simse.db")
	if err != nil {
		return err
	}

	Conn = db

	_, err = db.Exec("PRAGMA journal_mode=WAL;")
	if err != nil {
		return err
	}

	return nil
}

func openReadonly() error {
	readonlyDbPath := os.Getenv("STORAGE_PATH") + "/litefs/dbs/simse.db/database"

	// check if the file exists
	_, err := os.Stat(readonlyDbPath)
	if err != nil {
		return err
	}

	db, err := sql.Open("sqlite", readonlyDbPath+"?mode=ro")
	if err != nil {
		return err
	}

	ReadonlyConn = db
	return nil
}

func Open() {
	// attempt to open litefs readonly database
	err := openReadonly()
	if err != nil {
		log.Info().Err(err).Msg("failed to open readonly connection, waiting for litefs")
		go MountLitefs()
		pollForLitefs()

		return
	}

	log.Info().Msg("opened database readonly connection")
	go pollForLitefs()

	if meta.CurrentMeta.Environment == "prod" {
		go MountLitefs()
	} else {
		log.Info().Msg("skipping litefs mount because environment is not prod")
	}
}

func pollForLitefs() {
	if meta.CurrentMeta.Environment == "dev" {
		litefsPollRate = 1000
	}

	// wait for litefs to appear
	for {
		_, err := os.Stat("/litefs")
		if err == nil {
			break
		}

		log.Info().Str("wait", fmt.Sprintf("%d", litefsPollRate)).Msg("waiting for litefs to appear")
		time.Sleep(time.Duration(litefsPollRate) * time.Millisecond)
	}

	log.Info().Msg("litefs appears ready, opening connection")

	// retry connection 20 times, because litefs can take a while to connect to cluster
	for i := 0; i < 20; i++ {
		err := openConn()
		if err != nil {
			log.Info().Int("attempt", i+1).Msg("failed to open connection, retrying")
			time.Sleep(1 * time.Second)
			continue
		}

		break
	}

	log.Info().Msg("opened database connection")

	// close readonly connection
	if ReadonlyConn != nil {
		ReadonlyConn.Close()
		log.Info().Msg("closed readonly connection")
	}

	// run migrations if primary
	if Conn != nil && meta.IsPrimary() {
		log.Info().Msg("running migrations after sleeping for a sec")
		time.Sleep(1 * time.Second)
		RunMigrations()
	}
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
