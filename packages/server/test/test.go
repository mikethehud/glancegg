package test

import (
	"fmt"
	"github.com/DATA-DOG/go-txdb"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	"math/rand"
	"os"
	"testing"
)

func RegisterTXDB(envPath string) {
	err := godotenv.Load(envPath)
	if err != nil {
		panic("Can't register test db")
	}
	txdb.Register("pgx", "postgres", os.Getenv("DB_CONNECTION"))
}

func CreateTestDB(t *testing.T) *sqlx.DB {
	dbx := sqlx.MustConnect("pgx", fmt.Sprintf("test_%d", rand.Int()))
	t.Cleanup(func() {
		dbx.Close()
	})
	return dbx
}
