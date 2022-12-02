package model

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	Id               int            `gorm:"primaryKey;column:id"`
	UserId           int            `gorm:"column:user_id"`
	User             User           `gorm:"foreignKey:Id;references:UserId"`
	CouponId         int            `gorm:"column:coupon_id"`
	Coupon           UserCoupon     `gorm:"foreignKey:Id;references:CouponId"`
	PaymentOptionId  int            `gorm:"payment_option_id"`
	PaymentOption    PaymentOption  `gorm:"foreignKey:Id;references:PaymentOptionId"`
	DeliveryStatusId int            `gorm:"column:delivery_status_id"`
	DeliveryStatus   Delivery       `gorm:"foreignKey:Id;references:DeliveryStatusId"`
	TotalPrice       int            `gorm:"column:total_price"`
	OrderDetail      []OrderDetail  `gorm:"foreignKey:OrderId;references:Id"`
	CreatedAt        time.Time      `gorm:"column:created_at"`
	UpdatedAt        time.Time      `gorm:"column:updated_at"`
	DeletedAt        gorm.DeletedAt `gorm:"column:deleted_at"`
}

type OrderIdResponse struct {
	OrderId int
}

type OrderDetail struct {
	Id        int  `gorm:"primaryKey;column:id"`
	OrderId   int  `gorm:"column:order_id"`
	MenuId    int  `gorm:"column:menu_id"`
	Menu      Menu `gorm:"foreignKey:MenuId;references:Id"`
	Price     int
	Quantity  int
	AddOns    string
	CreatedAt time.Time      `gorm:"column:created_at"`
	UpdatedAt time.Time      `gorm:"column:updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at"`
}

type NewOrder struct {
	UserId           int
	CouponId         int `json:"coupon_id"`
	PaymentOptionId  int `json:"payment_option_id"`
	DeliveryStatusId int
	TotalPrice       int `json:"total_price"`
	OrderDate        time.Time
	OrderDetail      []OrderDetail `json:"order_detail"`
}

type OrderDateFilter struct {
	Start time.Time
	End   time.Time
}
