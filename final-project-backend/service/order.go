package service

import (
	"final-project-backend/pkg/utils"
	"final-project-backend/repository"
	"net/http"
)

type orderService struct {
	repository repository.OrderRepository
}

type OrderService interface {
	GetAllUserOrder(userId int, pageable utils.Pageable) (*utils.Page, int, error)
}

func NewOrderService(repository repository.OrderRepository) OrderService {
	return &orderService{
		repository: repository,
	}
}

func (os *orderService) GetAllUserOrder(userId int, pageable utils.Pageable) (*utils.Page, int, error) {
	data, dataError := os.repository.GetAllUserOrder(userId, pageable)
	if dataError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return data, http.StatusOK, nil
}
