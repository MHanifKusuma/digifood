package service

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/repository"
	"net/http"
)

type orderService struct {
	repository      repository.OrderRepository
	couponService   CouponService
	paymentService  PaymentService
	deliveryService DeliveryService
}

type OrderService interface {
	GetAllUserOrder(userId int, pageable utils.Pageable) (*utils.Page, int, error)
	CreateUserOrder(newOrder *model.NewOrder) (string, int, error)
}

func NewOrderService(repository repository.OrderRepository, couponService CouponService,
	paymentService PaymentService, deliveryService DeliveryService) OrderService {
	return &orderService{
		repository:      repository,
		couponService:   couponService,
		paymentService:  paymentService,
		deliveryService: deliveryService,
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

	checkPaymentOptionStatus, checkPaymentOptionsError := os.paymentService.CheckPaymentOption(newOrder.PaymentOptionId)
	if checkPaymentOptionsError != nil {
		return "error", http.StatusInternalServerError, checkPaymentOptionsError
	}
	if checkPaymentOptionStatus == 404 {
		return "payment option not found", http.StatusBadRequest, utils.ErrPaymentOptionNotFound
	}

	checkDeliveryStatusStatus, checkDeliveryStatusStatusError := os.deliveryService.CheckDeliveryStatus(newOrder.DeliveryStatusId)
	if checkDeliveryStatusStatusError != nil {
		return "error", http.StatusInternalServerError, utils.ErrNotExpected
	}
	if checkDeliveryStatusStatus == 404 {
		return "delivery status not found", http.StatusBadRequest, utils.ErrDeliveryStatusNotFound
	}

	message, createError := os.repository.CreateUserOrder(newOrder)
	if createError != nil {
		return "", http.StatusInternalServerError, utils.ErrNotExpected
	}

	return message, http.StatusCreated, nil
}
