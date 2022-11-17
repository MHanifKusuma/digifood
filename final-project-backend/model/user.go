package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	Id             int            `gorm:"primaryKey; column:id"`
	Fullname       string         `gorm:"column:fullname"`
	Phone          string         `gorm:"column:phone"`
	Email          string         `gorm:"column:email"`
	Username       string         `gorm:"column:username"`
	Password       string         `gorm:"column:password"`
	Role           string         `gorm:"column:role"`
	ProfilePicture string         `gorm:"column:profile_picture"`
	CreatedAt      time.Time      `gorm:"column:created_at"`
	UpdatedAt      time.Time      `gorm:"column:updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"column:deleted_at"`
}
