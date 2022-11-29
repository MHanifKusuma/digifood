package service

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/repository"
	"net/http"
)

type orderService struct {
	repository    repository.OrderRepository
	couponService CouponService
}

type OrderService interface {
	GetAllUserOrder(userId int, pageable utils.Pageable) (*utils.Page, int, error)
	CreateUserOrder(newOrder *model.NewOrder) (string, int, error)
}

func NewOrderService(repository repository.OrderRepository, couponService CouponService) OrderService {
	return &orderService{
		repository:    repository,
		couponService: couponService,
	}
}

func (os *orderService) GetAllUserOrder(userId int, pageable utils.Pageable) (*utils.Page, int, error) {
	data, dataError := os.repository.GetAllUserOrder(userId, pageable)
	if dataError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return data, http.StatusOK, nil
}

func (os *orderService) CreateUserOrder(newOrder *model.NewOrder) (string, int, error) {
	checkCouponStatus, checkCouponError := os.couponService.CheckUserCoupon(newOrder.UserId, newOrder.CouponId)
	if checkCouponError != nil {
		return "error", http.StatusInternalServerError, checkCouponError
	}
	if checkCouponStatus == 400 {
		return "user coupon not found", checkCouponStatus, utils.ErrCouponNotFound
	}

	message, createError := os.repository.CreateUserOrder(newOrder)
	if createError != nil {
		return "", http.StatusInternalServerError, utils.ErrNotExpected
	}

	return message, http.StatusCreated, nil
}
