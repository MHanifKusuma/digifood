package router

import (
	"final-project-backend/handler"
	"final-project-backend/middleware"
	"final-project-backend/repository"
	"final-project-backend/service"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HandleRequests(db *gorm.DB) {
	authRepository := repository.NewAuthRepository(db)
	categoryRepository := repository.NewCategoryRepository(db)
	menuRepository := repository.NewMenuRepository(db)
	orderRepository := repository.NewOrderRepository(db)

	authService := service.NewAuthService(authRepository)
	categoryService := service.NewCategoryService(categoryRepository)
	menuService := service.NewMenuService(menuRepository)
	orderService := service.NewOrderService(orderRepository)

	authHandler := handler.NewAuthHandler(authService)
	categoryHandler := handler.NewCategoryHandler(categoryService)
	menuHandler := handler.NewMenuHandler(menuService)
	orderHandler := handler.NewOrderHandler(orderService)

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}

	gin := gin.Default()
	gin.Use(cors.New(config))

	gin.Static("docs", "./dist")

	authorizationRoutes(gin, db, authHandler)
	categoryRoutes(gin, db, categoryHandler)
	menuRoutes(gin, db, menuHandler)

	gin.Use(middleware.AuthMiddleware())
	orderRoutes(gin, db, orderHandler)

	gin.Run()
}
