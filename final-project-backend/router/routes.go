package router

import (
	"final-project-backend/handler"
	"final-project-backend/repository"
	"final-project-backend/service"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HandleRequests(db *gorm.DB) {
	authRepository := repository.NewAuthRepository(db)

	authService := service.NewAuthService(authRepository)

	authHandler := handler.NewAuthHandler(authService)

	config := cors.DefaultConfig()
  	config.AllowOrigins = []string{"*"}
	  
	gin := gin.Default()
	gin.Use(cors.New(config))

	gin.Static("docs", "./dist")

	authorizationRoutes(gin, db, authHandler)

	gin.Run()
}
