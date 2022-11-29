package repository

import (
	"final-project-backend/model"

	"gorm.io/gorm"
)

type deliveryRepository struct {
	db *gorm.DB
}

type DeliveryRepository interface {
	GetAllDeliveryStatus() ([]*model.Delivery, error)
}

func NewDeliveryRepository(db *gorm.DB) DeliveryRepository {
	return &deliveryRepository{
		db: db,
	}
}

func (dr *deliveryRepository) GetAllDeliveryStatus() ([]*model.Delivery, error) {
	var deliverStatus []*model.Delivery

	status := dr.db.Find(&deliverStatus)
	if status.Error != nil {
		return nil, status.Error
	}

	return deliverStatus, nil
}
