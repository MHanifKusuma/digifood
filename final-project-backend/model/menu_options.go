package model

import (
	"time"

	"gorm.io/gorm"
)

type MenuOption struct {
	Id        int            `gorm:"primaryKey; column:id"`
	Name      string         `gorm:"column:name"`
	MenuId    int            `gorm:"column:menu_id"`
	Price     int            `gorm:"column:price"`
	Type      string         `gorm:"column:type"`
	CreatedAt time.Time      `gorm:"column:created_at"`
	UpdatedAt time.Time      `gorm:"column:updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at"`
}
