package model

import (
	"time"

	"gorm.io/gorm"
)

type Menu struct {
	Id             int            `gorm:"primarykey;column:id"`
	CategoryId     int            `gorm:"column:category_id"`
	Name           string         `gorm:"column:name"`
	Description    string         `gorm:"column:description"`
	AverageRating  float64        `gorm:"column:avg_rating"`
	TotalFavorites int            `gorm:"total_favorites"`
	TotalReview    int            `gorm:"column:total_review"`
	Price          int            `gorm:"column:price"`
	MenuPhoto      string         `gorm:"column:menu_photo"`
	MenuOptions    []MenuOption   `gorm:"foreignKey:MenuId;references:Id"`
	Promotion      Promotion      `gorm:"foreignKey:MenuId;references:Id"`
	CreatedAt      time.Time      `gorm:"column:created_at"`
	UpdatedAt      time.Time      `gorm:"column:updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"column:deleted_at"`
}
