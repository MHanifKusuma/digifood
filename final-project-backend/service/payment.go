package service

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/repository"
	"net/http"
)

type paymentService struct {
	repository repository.PaymentRepository
}

type PaymentService interface {
	GetAllPaymentOptions() ([]*model.PaymentOption, int, error)
	CheckPaymentOption(paymentOptionId int) (int, error)
}

func NewPaymentService(repository repository.PaymentRepository) PaymentService {
	return &paymentService{
		repository: repository,
	}
}

func (ps *paymentService) GetAllPaymentOptions() ([]*model.PaymentOption, int, error) {
	options, optionsError := ps.repository.GetAllPaymentOptions()
	if optionsError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return options, http.StatusOK, nil
}

func (ps *paymentService) CheckPaymentOption(paymentOptionId int) (int, error) {
	options, status, optionsError := ps.GetAllPaymentOptions()
	if optionsError != nil {
		return status, optionsError
	}

	for _, option := range options {
		if option.Id == paymentOptionId {
			return http.StatusOK, nil
		}
	}

	return http.StatusNotFound, utils.ErrPaymentOptionNotFound
}
