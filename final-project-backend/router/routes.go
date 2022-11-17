package router

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HandleRequests(db *gorm.DB) {

	gin := gin.Default()

	gin.Static("docs", "./dist")

	gin.Run()
}
