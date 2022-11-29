package service

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/repository"
	"net/http"
)

type deliveryService struct {
	repository repository.DeliveryRepository
}

type DeliveryService interface {
	GetAllDeliveryStatus() ([]*model.Delivery, int, error)
	CheckDeliveryStatus(deliveryStatusId int) (int, error)
}

func NewDeliveryService(repository repository.DeliveryRepository) DeliveryService {
	return &deliveryService{
		repository: repository,
	}
}

func (ds *deliveryService) GetAllDeliveryStatus() ([]*model.Delivery, int, error) {
	status, statusError := ds.repository.GetAllDeliveryStatus()
	if statusError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return status, http.StatusOK, nil
}

func (ds *deliveryService) CheckDeliveryStatus(deliveryStatusId int) (int, error) {
	deliveryStatus, status, statusError := ds.GetAllDeliveryStatus()
	if statusError != nil {
		return status, statusError
	}

	for _, delivery := range deliveryStatus {
		if delivery.Id == deliveryStatusId {
			return http.StatusOK, nil
		}
	}

	return http.StatusNotFound, utils.ErrDeliveryStatusNotFound
}
