package router

import (
	"final-project-backend/handler"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func categoryRoutes(gin *gin.Engine, db *gorm.DB, categoryHandler *handler.CategoryHandler) {
	gin.GET("/categories", categoryHandler.GetAllCategory)
	gin.PUT("/categories", categoryHandler.UpdateCategory)
	gin.DELETE("/categories", categoryHandler.DeleteCategory)
}
