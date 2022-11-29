package repository

import (
	"final-project-backend/model"

	"gorm.io/gorm"
)

type paymentRepository struct {
	db *gorm.DB
}

type PaymentRepository interface {
	GetAllPaymentOptions() ([]*model.PaymentOption, error)
}

func NewPaymentRepository(db *gorm.DB) PaymentRepository {
	return &paymentRepository{
		db: db,
	}
}

func (pr *paymentRepository) GetAllPaymentOptions() ([]*model.PaymentOption, error) {
	var paymentOptions []*model.PaymentOption

	options := pr.db.Find(&paymentOptions)
	if options.Error != nil {
		return nil, options.Error
	}

	return paymentOptions, nil
}
