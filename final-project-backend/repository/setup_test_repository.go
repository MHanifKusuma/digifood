package repository

import (
	"database/sql"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/suite"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Suite struct {
	suite.Suite
	GormDB *gorm.DB
	SqlDB  *sql.DB
	mock   sqlmock.Sqlmock

	authRepo AuthRepository
}

func SetupSuite(t *testing.T) *Suite {
	s := &Suite{}

	s.SqlDB, s.mock, _ = sqlmock.New()

	dialector := postgres.New(postgres.Config{
		DSN:                  "sqlmock_db_0",
		DriverName:           "postgres",
		Conn:                 s.SqlDB,
		PreferSimpleProtocol: true,
	})
	s.GormDB, _ = gorm.Open(dialector, &gorm.Config{})

	s.authRepo = NewAuthRepository(s.GormDB)
	return s
}
