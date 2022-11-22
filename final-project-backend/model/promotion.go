package model

import (
	"time"

	"gorm.io/gorm"
)

type Promotion struct {
	Id        int            `gorm:"primaryKey;column:id"`
	MenuId    int            `gorm:"column:menu_id"`
	Name      string         `gorm:"column:name"`
	Discount  int            `gorm:"column:discount"`
	Available bool           `gorm:"column:available"`
	CreatedAt time.Time      `gorm:"column:created_at"`
	UpdatedAt time.Time      `gorm:"column:updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at"`
}
