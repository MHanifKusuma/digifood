package repository

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"fmt"

	"gorm.io/gorm"
)

type orderRepository struct {
	db *gorm.DB
}

type OrderRepository interface {
	GetAllUserOrder(userId int, pageable utils.Pageable) (*utils.Page, error)
	GetUserOrderById(userId, orderId int) (*model.Order, error)
	CreateUserOrder(newOrder *model.NewOrder) (*model.OrderIdResponse, error)
}

func NewOrderRepository(db *gorm.DB) OrderRepository {
	return &orderRepository{
		db: db,
	}
}

func (or *orderRepository) GetAllUserOrder(userId int, pageable utils.Pageable) (*utils.Page, error) {
	var count int64
	var countError error

	arguments := []interface{}{
		pageable.SearchParams()[utils.SEARCH_BY_MENU_NAME],
		pageable.FilterParams()[utils.FILTER_BY_CATEGORY],
	}

	if arguments[1] != nil && arguments[1] != "0" {
		countError = or.db.
			Model(&model.Order{}).
			Joins("join order_details on order_details.order_id = orders.id").
			Joins("join menus on menus.id = order_details.menu_id").
			Group("orders.id").
			Where("menus.name ILIKE ?", arguments[0]).
			Where("menus.category_id = ?", arguments[1]).
			Count(&count).Error
	} else {
		countError = or.db.
			Model(&model.Order{}).
			Joins("join order_details on order_details.order_id = orders.id").
			Joins("join menus on menus.id = order_details.menu_id").
			Group("orders.id").
			Where("menus.name ILIKE ?", arguments[0]).
			Count(&count).Error
	}

	if countError != nil {
		return utils.NewPaginator(pageable.GetPage(), pageable.GetLimit(), 0).Pageable(model.Order{}), nil
	}

	if count == 0 {
		return utils.NewPaginator(pageable.GetPage(), pageable.GetLimit(), 0).Pageable(model.Order{}), nil
	}

	paginator := utils.NewPaginator(pageable.GetPage(), pageable.GetLimit(), int(count))
	arguments = append(arguments, pageable.SortBy(), paginator.PerPageNums, paginator.Offset())

	var orders []model.Order
	var findError error

	if arguments[1] != nil && arguments[1] != "0" {
		findError = or.db.
			Preload("Coupon").Preload("Coupon.Coupon").
			Preload("PaymentOption").
			Preload("DeliveryStatus").
			Preload("OrderDetail").Preload("OrderDetail.Menu").Preload("OrderDetail.Menu.Promotion").
			Joins("join order_details on order_details.order_id = orders.id").
			Joins("join menus on menus.id = order_details.menu_id").
			Group("orders.id").
			Where("menus.name ILIKE ?", arguments[0]).
			Where("menus.category_id = ?", arguments[1]).
			Order(arguments[2]).
			Limit(arguments[3].(int)).
			Offset(arguments[4].(int)).
			Find(&orders).Error
	} else {
		findError = or.db.
			Preload("Coupon").Preload("Coupon.Coupon").
			Preload("PaymentOption").
			Preload("DeliveryStatus").
			Preload("OrderDetail").Preload("OrderDetail.Menu").Preload("OrderDetail.Menu.Promotion").
			Joins("join order_details on order_details.order_id = orders.id").
			Joins("join menus on menus.id = order_details.menu_id").
			Group("orders.id").
			Where("orders.user_id = ?", userId).
			Where("menus.name ILIKE ?", arguments[0]).
			Order(arguments[2]).
			Limit(arguments[3].(int)).
			Offset(arguments[4].(int)).
			Find(&orders).Error
	}

	return paginator.Pageable(orders), findError
}

func (or *orderRepository) GetUserOrderById(userId, orderId int) (*model.Order, error) {
	var order *model.Order

	res := or.db.
		Preload("Coupon").Preload("Coupon.Coupon").
		Preload("PaymentOption").
		Preload("DeliveryStatus").
		Preload("OrderDetail").Preload("OrderDetail.Menu").Preload("OrderDetail.Menu.Promotion").
		Where("user_id = ? and id = ?", userId, orderId).
		Find(&order)
	if res.Error != nil {
		return nil, res.Error
	}

	return order, nil
}

func (or *orderRepository) CreateUserOrder(newOrder *model.NewOrder) (*model.OrderIdResponse, error) {
	var order = model.Order{
		UserId:           newOrder.UserId,
		CouponId:         newOrder.CouponId,
		PaymentOptionId:  newOrder.PaymentOptionId,
		DeliveryStatusId: newOrder.DeliveryStatusId,
		TotalPrice:       newOrder.TotalPrice,
	}

	if order.CouponId == 0 {
		res := or.db.Omit("CouponId").Create(&order)

		if res.Error != nil {
			return nil, res.Error
		}
	} else {
		res := or.db.Create(&order)
		if res.Error != nil {
			return nil, res.Error
		}
	}

	for _, detail := range newOrder.OrderDetail {
		fmt.Println(detail)
		detail.OrderId = order.Id
		if createNewOrderDetailError := or.db.Create(&detail).Error; createNewOrderDetailError != nil {
			return nil, createNewOrderDetailError
		}
	}

	newOrderId := new(model.OrderIdResponse)
	newOrderId.OrderId = order.Id

	return newOrderId, nil
}
