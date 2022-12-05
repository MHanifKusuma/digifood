package handler

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CouponHandler struct {
	service service.CouponService
}

func NewCouponHandler(service service.CouponService) *CouponHandler {
	return &CouponHandler{
		service: service,
	}
}

func (ch *CouponHandler) GetAllUserCoupon(c *gin.Context) {
	getUserId, userExists := c.Get("user_id")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}

	id := getUserId.(string)
	userId, _ := strconv.Atoi(id)

	userCoupons, status, userCouponsError := ch.service.GetUserCoupon(userId, newCouponPageableRequest((c)))
	if userCouponsError != nil {
		utils.ErrorResponse(c.Writer, userCouponsError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, userCoupons, status)
}

func (ch *CouponHandler) GetAllCoupon(c *gin.Context) {
	getUserRole, userExists := c.Get("user_role")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}

	role := getUserRole.(string)
	userRole, _ := strconv.Atoi(role)

	getAllCoupon, status, getAllCouponError := ch.service.GetAllCoupon(newAdminCouponPageableRequest(c), userRole)
	if getAllCouponError != nil {
		utils.ErrorResponse(c.Writer, getAllCouponError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, getAllCoupon, status)
}

func(ch *CouponHandler) GetCouponById(c *gin.Context) {
	var id int

	if param, ParamError := strconv.Atoi(c.Param("id")); ParamError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
	} else {
		id = param
	}

	coupon, status, couponError := ch.service.GetCouponById(id)
	if couponError != nil {
		utils.ErrorResponse(c.Writer, couponError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, coupon, status)
}

func(ch *CouponHandler) UpdateCoupon(c *gin.Context) {
	getUserRole, userExists := c.Get("user_role")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}

	role := getUserRole.(string)
	userRole, _ := strconv.Atoi(role)

	var payload model.Coupon
	if bindJsonError := c.ShouldBindJSON(&payload); bindJsonError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
		return
	}

	coupon, status, couponError := ch.service.UpdateCoupon(payload, userRole)
	if couponError != nil {
		utils.ErrorResponse(c.Writer, couponError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, coupon, status)
}

func(ch *CouponHandler) DeleteCoupon(c *gin.Context) {
	getUserRole, userExists := c.Get("user_role")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}

	role := getUserRole.(string)
	userRole, _ := strconv.Atoi(role)

	var id int

	if param, ParamError := strconv.Atoi(c.Param("id")); ParamError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
	} else {
		id = param
	}

	deletedId, status, deleteError := ch.service.DeleteCoupon(id, userRole)
	if deleteError != nil {
		utils.ErrorResponse(c.Writer, deleteError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, deletedId, status)
}

func newCouponPageableRequest(c *gin.Context) *model.PageableRequest {
	p := &model.PageableRequest{}
	p.Page = utils.PageFromQueryParam(c)
	p.Limit = utils.LimitFromQueryParam(c)
	p.Sort_by = utils.SortValueFromQueryParam(c)
	p.Type = "coupon"

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

func newAdminCouponPageableRequest(c *gin.Context) *model.PageableRequest {
	p := &model.PageableRequest{}
	p.Page = utils.PageFromQueryParam(c)
	p.Limit = utils.LimitFromQueryParam(c)
	p.Sort_by = utils.SortValueFromQueryParam(c)
	p.Type = "coupon"

	if p.Sort_by == "" {
		p.Sort_by = utils.SORT_BY_DATE
	}

	p.Order = utils.OrderFromQueryParam(c)

	return p
}