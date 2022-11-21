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
	categoryRepository := repository.NewCategoryRepository(db)

	authService := service.NewAuthService(authRepository)
	categoryService := service.NewCategoryService(categoryRepository)

	authHandler := handler.NewAuthHandler(authService)
	categoryHandler := handler.NewCategoryHandler(categoryService)

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}

	gin := gin.Default()
	gin.Use(cors.New(config))

	gin.Static("docs", "./dist")

	authorizationRoutes(gin, db, authHandler)
	categoryRoutes(gin, db, categoryHandler)

	gin.Run()
}
