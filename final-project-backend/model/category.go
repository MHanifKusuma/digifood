package model

import (
	"time"

	"gorm.io/gorm"
)

type Category struct {
	Id        int            `gorm:"primaryKey;column:id"`
	Name      string         `gorm:"column:name"`
	Menu      []Menu         `gorm:"foreignKey:CategoryId;references:Id"`
	CreatedAt time.Time      `gorm:"column:created_at"`
	UpdatedAt time.Time      `gorm:"column:updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at"`
}
