package router

import (
	"final-project-backend/handler"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func deliveryRoutes(gin *gin.Engine, db *gorm.DB, deliveryHandler *handler.DeliveryHandler) {
	gin.GET("/delivery-statuses", deliveryHandler.GetAllDeliveryStatus)
}
