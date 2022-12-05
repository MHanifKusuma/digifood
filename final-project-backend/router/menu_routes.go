package router

import (
	"final-project-backend/handler"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func menuRoutes(gin *gin.Engine, db *gorm.DB, menuHandler *handler.MenuHandler) {
	gin.GET("/menus", menuHandler.GetAllMenu)
	gin.GET("/menus/categories", menuHandler.GetAllMenuByCategory)
	gin.GET("/menus/:id", menuHandler.GetMenuById)

	gin.POST("/admin/menus", menuHandler.CreateMenu)
	gin.PUT("/admin/menus/:id", menuHandler.UpdateMenu)
	gin.DELETE("/admin/menus/:id", menuHandler.DeleteMenu)
}
