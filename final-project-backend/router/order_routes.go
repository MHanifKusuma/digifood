package router

import (
	"final-project-backend/handler"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func orderRoutes(gin *gin.Engine, db *gorm.DB, orderHandler *handler.OrderHandler) {
	gin.GET("/orders", orderHandler.GetAllUserOrder)
	gin.GET("/orders/:id", orderHandler.GetUserOrderById)
	gin.POST("/orders", orderHandler.CreateUserOrder)
	gin.POST("/orders-delivery-status", orderHandler.UpdateDeliveryStatus)

	gin.GET("/admin/orders", orderHandler.GetAllOrder)
}
