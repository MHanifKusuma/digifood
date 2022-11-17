package database

import (
	"final-project-backend/config"
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func InitDB() *gorm.DB {
	dbConfig := config.Database()

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold: time.Second,
			LogLevel:      logger.Info,
			Colorful:      true,
		})

	db, err := gorm.Open(postgres.Open(dbConfig.ToString()), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to database...")
	fmt.Println("= = = = = = = = = = = = ")
	fmt.Println()

	return db
}
