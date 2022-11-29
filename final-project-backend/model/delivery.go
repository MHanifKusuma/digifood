package model

import (
	"time"

	"gorm.io/gorm"
)

type Delivery struct {
	Id        int            `gorm:"primaryKey;column:id"`
	Status    string         `gorm:"column:status"`
	CreatedAt time.Time      `gorm:"column:created_at"`
	UpdatedAt time.Time      `gorm:"column:updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at"`
}
