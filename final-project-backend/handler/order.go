package handler

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/service"
	"net/http"
	"strconv"

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
	userId, _ := strconv.Atoi(id)

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

	message, status, createOrderError := oh.service.CreateUserOrder(&newOrder)
	if createOrderError != nil {
		utils.ErrorResponse(c.Writer, createOrderError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, message, status)
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
