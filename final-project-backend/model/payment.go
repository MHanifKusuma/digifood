package model

import (
	"time"

	"gorm.io/gorm"
)

type PaymentOption struct {
	Id        int            `gorm:"primaryKey;column:id"`
	Name      string         `gorm:"column:name"`
	CreatedAt time.Time      `gorm:"column:created_at"`
	UpdatedAt time.Time      `gorm:"column:updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at"`
}
