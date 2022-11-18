package router

import (
	"final-project-backend/handler"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func authorizationRoutes(gin *gin.Engine, db *gorm.DB, authHandler *handler.AuthHandler) {
	gin.POST("/login", authHandler.Login)
	gin.POST("/register", authHandler.Register)
}
