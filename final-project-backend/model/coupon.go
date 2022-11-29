package model

import (
	"time"

	"gorm.io/gorm"
)

type Coupon struct {
	Id             int            `gorm:"primaryKey;column:id"`
	Code           string         `gorm:"column:code"`
	DiscountAmount int            `gorm:"column:discount_amount"`
	Available      bool           `gorm:"column:available"`
	CreatedAt      time.Time      `gorm:"column:created_at"`
	UpdatedAt      time.Time      `gorm:"column:updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"column:deleted_at"`
}

type UserCoupon struct {
	Id         int            `gorm:"primaryKey;column:id"`
	CouponId   int            `gorm:"column:coupon_id"`
	Coupon     Coupon         `gorm:"foreignKey:Id;references:CouponId"`
	Expired_at time.Time      `gorm:"column:expired_at"`
	Amount     int            `gorm:"column:amount"`
	CreatedAt  time.Time      `gorm:"column:created_at"`
	UpdatedAt  time.Time      `gorm:"column:updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"column:deleted_at"`
}
