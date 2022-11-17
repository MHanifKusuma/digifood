package main

import (
	"final-project-backend/config"
	"final-project-backend/pkg/database"
	"final-project-backend/router"
	"fmt"
)

func main() {
	fmt.Println("Program initialization...")
	if err := config.LoadConfig(); err != nil {
		panic(err)
	}

	db := database.InitDB()

	router.HandleRequests(db)
}
