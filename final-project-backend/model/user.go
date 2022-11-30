package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	Id             int             `gorm:"primaryKey; column:id"`
	FullName       string          `gorm:"column:full_name"`
	Phone          string          `gorm:"column:phone"`
	Email          string          `gorm:"column:email"`
	Username       string          `gorm:"column:username"`
	Password       string          `gorm:"column:password"`
	Role           int             `gorm:"column:role"`
	ProfilePicture string          `gorm:"column:profile_picture"`
	UserFavorite   []UserFavorites `gorm:"foreignKey:UserId;references:Id"`
	CreatedAt      time.Time       `gorm:"column:created_at"`
	UpdatedAt      time.Time       `gorm:"column:updated_at"`
	DeletedAt      gorm.DeletedAt  `gorm:"column:deleted_at"`
}

type UserFavorites struct {
	Id     int  `gorm:"primaryKey;column:id"`
	UserId int  `gorm:"column:user_id"`
	MenuId int  `gorm:"column:menu_id"`
	Menu   Menu `gorm:"foreignKey:Id;references:MenuId"`
}

type NewUserFavorite struct {
	UserId int
	MenuId int `json:"menuId"`
}
