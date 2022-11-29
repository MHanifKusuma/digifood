package router

import (
	"final-project-backend/handler"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func orderRoutes(gin *gin.Engine, db *gorm.DB, orderHandler *handler.OrderHandler) {
	gin.GET("/orders", orderHandler.GetAllUserOrder)
	gin.POST("/orders", orderHandler.CreateUserOrder)
}
