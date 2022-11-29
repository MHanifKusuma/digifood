package router

import (
	"final-project-backend/handler"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func paymentRoutes(gin *gin.Engine, db *gorm.DB, paymentHandler *handler.PaymentHandler) {
	gin.GET("/payment-options", paymentHandler.GetAllPaymentOptions)
}
