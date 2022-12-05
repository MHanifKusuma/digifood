package handler

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/service"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type OrderHandler struct {
	service service.OrderService
}

func NewOrderHandler(service service.OrderService) *OrderHandler {
	return &OrderHandler{
		service: service,
	}
}

func (oh *OrderHandler) GetAllUserOrder(c *gin.Context) {
	getUserId, userExists := c.Get("user_id")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}

	id := getUserId.(string)
	userId, _ := strconv.Atoi(id)

	allOrders, status, allOrdersError := oh.service.GetAllUserOrder(userId, newOrderPageableRequest(c))
	if allOrdersError != nil {
		utils.ErrorResponse(c.Writer, allOrdersError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, allOrders, status)
}

func (oh *OrderHandler) GetUserOrderById(c *gin.Context) {
	getUserId, userExists := c.Get("user_id")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}
	id := getUserId.(string)
	
	getUserRole, roleExists := c.Get("user_role")
	if !roleExists {
		utils.ErrorResponse(c.Writer, utils.ErrPageRestricted.Error(), http.StatusUnauthorized)
		return
	}

	
	var userId int
	if(getUserRole.(string) == "0") {
		userId = -1
	} else {
		userId, _ = strconv.Atoi(id)
	}

	orderId, orderIdError := strconv.Atoi(c.Param("id"))
	if orderIdError != nil {
		utils.ErrorResponse(c.Writer, orderIdError.Error(), http.StatusBadRequest)
		return
	}

	getUserOrder, status, getUserOrderError := oh.service.GetUserOrderById(userId, orderId)
	if getUserOrderError != nil {
		utils.ErrorResponse(c.Writer, getUserOrderError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, getUserOrder, status)
}

func (oh *OrderHandler) CreateUserOrder(c *gin.Context) {
	getUserId, userExists := c.Get("user_id")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}

	id := getUserId.(string)
	userId, _ := strconv.Atoi(id)

	var newOrder model.NewOrder

	if bindJsonError := c.ShouldBindJSON(&newOrder); bindJsonError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
		return
	}

	newOrder.DeliveryStatusId = 1
	newOrder.UserId = userId

	newOrderId, status, createOrderError := oh.service.CreateUserOrder(&newOrder)
	if createOrderError != nil {
		utils.ErrorResponse(c.Writer, createOrderError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, newOrderId, status)
}

func (oh *OrderHandler) UpdateDeliveryStatus(c *gin.Context) {
	type updateDeliveryStatus struct {
		OrderId    int
		DeliveryId int
	}

	var payload updateDeliveryStatus

	if bindJsonError := c.ShouldBindJSON(&payload); bindJsonError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
		return
	}

	message, status, updateDeliveryStatusError := oh.service.UpdateDeliveryStatus(payload.OrderId, payload.DeliveryId)
	if updateDeliveryStatusError != nil {
		utils.ErrorResponse(c.Writer, updateDeliveryStatusError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, message, status)
}

func (oh *OrderHandler) GetAllOrder(c *gin.Context) {
	getUserRole, userExists := c.Get("user_role")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}

	role := getUserRole.(string)
	userRole, _ := strconv.Atoi(role)

	allOrders, status, allOrdersError := oh.service.GetAllOrder(userRole, newAdminOrderPageableRequest(c))
	if allOrdersError != nil {
		utils.ErrorResponse(c.Writer, allOrdersError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, allOrders, status)
}

func newOrderPageableRequest(c *gin.Context) *model.PageableRequest {
	p := &model.PageableRequest{}
	p.Page = utils.PageFromQueryParam(c)
	p.Limit = utils.LimitFromQueryParam(c)
	p.Sort_by = utils.SortValueFromQueryParam(c)
	p.Type = "order"

	if p.Sort_by == "" {
		p.Sort_by = utils.SORT_BY_DATE
	}

	p.Order = utils.OrderFromQueryParam(c)
	p.Search = map[string]interface{}{}
	p.Filters = map[string]interface{}{}

	p.Search[utils.SEARCH_BY_MENU_NAME] = utils.QueryLikeParamOrNull(c, utils.SEARCH_BY_MENU_NAME)
	p.Filters[utils.FILTER_BY_CATEGORY] = utils.QueryParamOrNull(c, utils.FILTER_BY_CATEGORY)

	return p
}

func newAdminOrderPageableRequest(c *gin.Context) *model.PageableRequest {
	p := &model.PageableRequest{}
	p.Page = utils.PageFromQueryParam(c)
	p.Limit = utils.LimitFromQueryParam(c)
	p.Sort_by = utils.SortValueFromQueryParam(c)
	p.Type = "adminOrder"

	if p.Sort_by == "" {
		p.Sort_by = utils.SORT_BY_DATE
	}

	p.Order = utils.OrderFromQueryParam(c)
	p.Search = map[string]interface{}{}
	p.Filters = map[string]interface{}{}

	filterDate := utils.QueryParamOrNull(c, utils.FILTER_BY_CREATED_DATE)
	dateFilter := new(model.OrderDateFilter)

	if filterDate != nil {
		switch filterDate {
		case "this_week":
			dateFilter.Start = time.Now().AddDate(0, 0, -7)

			p.Filters[utils.FILTER_BY_CREATED_DATE] = dateFilter

		case "this_month":
			dateFilter.Start = time.Now().AddDate(0, -1, 0)

			p.Filters[utils.FILTER_BY_CREATED_DATE] = dateFilter

		case "last_month":
			dateFilter.Start = time.Now().AddDate(0, -1, 0)
			dateFilter.End = time.Now().AddDate(0, -2, 0)

			p.Filters[utils.FILTER_BY_CREATED_DATE] = dateFilter
		}

	}

	return p
}
