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
	GetUserOrderById(userId, orderId int) (*model.Order, int, error)
	CreateUserOrder(newOrder *model.NewOrder) (*model.OrderIdResponse, int, error)
	UpdateDeliveryStatus(orderId, deliveryStatusId int) (string, int, error)
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

func (os *orderService) GetUserOrderById(userId, orderId int) (*model.Order, int, error) {
	order, orderError := os.repository.GetUserOrderById(userId, orderId)
	if orderError != nil {
		return nil, http.StatusNotFound, utils.ErrOrderNotFound
	}

	return order, http.StatusOK, nil
}

func (os *orderService) CreateUserOrder(newOrder *model.NewOrder) (*model.OrderIdResponse, int, error) {
	if newOrder.CouponId != 0 {
		checkCouponStatus, checkCouponError := os.couponService.CheckUserCoupon(newOrder.UserId, newOrder.CouponId)
		if checkCouponError != nil && checkCouponStatus != 404 {
			return nil, http.StatusInternalServerError, checkCouponError
		}
		if checkCouponStatus == 404 {
			return nil, http.StatusBadRequest, utils.ErrCouponNotFound
		}
	}

	checkPaymentOptionStatus, checkPaymentOptionsError := os.paymentService.CheckPaymentOption(newOrder.PaymentOptionId)
	if checkPaymentOptionsError != nil {
		return nil, http.StatusInternalServerError, checkPaymentOptionsError
	}
	if checkPaymentOptionStatus == 404 {
		return nil, http.StatusBadRequest, utils.ErrPaymentOptionNotFound
	}

	checkDeliveryStatusStatus, checkDeliveryStatusStatusError := os.deliveryService.CheckDeliveryStatus(newOrder.DeliveryStatusId)
	if checkDeliveryStatusStatusError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}
	if checkDeliveryStatusStatus == 404 {
		return nil, http.StatusBadRequest, utils.ErrDeliveryStatusNotFound
	}

	newOrderId, createError := os.repository.CreateUserOrder(newOrder)
	if createError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return newOrderId, http.StatusCreated, nil
}

func (os *orderService) UpdateDeliveryStatus(orderId, deliveryStatusId int) (string, int, error) {
	checkDeliveryStatusStatus, checkDeliveryStatusStatusError := os.deliveryService.CheckDeliveryStatus(deliveryStatusId)
	if checkDeliveryStatusStatusError != nil {
		return "error", http.StatusInternalServerError, utils.ErrNotExpected
	}
	if checkDeliveryStatusStatus == 404 {
		return "error", http.StatusBadRequest, utils.ErrDeliveryStatusNotFound
	}

	message, updateError := os.repository.UpdateDeliveryStatus(orderId, deliveryStatusId)
	if updateError != nil {
		return "error", http.StatusInternalServerError, utils.ErrNotExpected
	}

	return message, http.StatusOK, nil
}