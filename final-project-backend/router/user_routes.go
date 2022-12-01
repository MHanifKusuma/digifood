package router

import (
	"final-project-backend/handler"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func userRoutes(gin *gin.Engine, db *gorm.DB, userHandler *handler.UserHandler) {
	gin.GET("/profile", userHandler.GetUserProfile)
	gin.POST("/profile", userHandler.UpdateUserProfile)
	gin.POST("/favorites", userHandler.AddFavorite)
}
