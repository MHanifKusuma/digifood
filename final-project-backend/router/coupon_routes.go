package router

import (
	"final-project-backend/handler"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func couponRoutes(gin *gin.Engine, db *gorm.DB, couponHandler *handler.CouponHandler) {
	gin.GET("/coupons", couponHandler.GetAllUserCoupon)
	gin.GET("/coupons/:id", couponHandler.GetCouponById)

	gin.GET("/admin/coupons", couponHandler.GetAllCoupon)
	gin.PUT("/admin/coupons", couponHandler.UpdateCoupon)
	gin.DELETE("/admin/coupons/:id", couponHandler.DeleteCoupon)
}
