package config

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestDatabaseConfig(t *testing.T) {
	db := &database{
		host:     "localhost",
		port:     5432,
		username: "postgres",
		password: "dev",
		dbName:   "final-project-database-muhammad-hanif",
	}

	assert.NotNil(t, db)

	config := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		db.host, db.port, db.username, db.password, db.dbName)

	assert.Equal(t, config, db.ToString())
}
