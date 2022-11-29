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

func newCouponPageableRequest(c *gin.Context) *model.PageableRequest {
	p := &model.PageableRequest{}
	p.Page = utils.PageFromQueryParam(c)
	p.Limit = utils.LimitFromQueryParam(c)
	p.Sort_by = utils.SortValueFromQueryParam(c)
	p.Type = "coupon"

	if p.Sort_by == "" {
		p.Sort_by = utils.DEFAULT_SORT_BY
	}

	p.Order = utils.OrderFromQueryParam(c)
	p.Search = map[string]interface{}{}
	p.Filters = map[string]interface{}{}

	p.Search[utils.SEARCH_BY_MENU_NAME] = utils.QueryLikeParamOrNull(c, utils.SEARCH_BY_MENU_NAME)
	p.Filters[utils.FILTER_BY_CATEGORY] = utils.QueryParamOrNull(c, utils.FILTER_BY_CATEGORY)

	return p
}
