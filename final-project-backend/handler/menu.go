package handler

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type MenuHandler struct {
	service service.MenuService
}

func NewMenuHandler(service service.MenuService) *MenuHandler {
	return &MenuHandler{
		service: service,
	}
}

func (mh *MenuHandler) GetAllMenu(c *gin.Context) {
	allMenu, status, allMenuError := mh.service.GetAllMenu(newMenuPageableRequest(c))
	if allMenuError != nil {
		utils.ErrorResponse(c.Writer, allMenuError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, allMenu, status)
}

func (mh *MenuHandler) GetAllMenuByCategory(c *gin.Context) {
	allMenuByCategory, status, allMenuByCategoryError := mh.service.GetAllMenuByCategory()
	if allMenuByCategoryError != nil {
		utils.ErrorResponse(c.Writer, allMenuByCategoryError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, allMenuByCategory, status)
}

func (mh *MenuHandler) GetMenuById(c *gin.Context) {
	var id int

	if param, ParamError := strconv.Atoi(c.Param("id")); ParamError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
	} else {
		id = param
	}

	menu, status, menuError := mh.service.GetMenuById(id)
	if menuError != nil {
		utils.ErrorResponse(c.Writer, menuError.Error(), status)
	}

	utils.SuccessResponse(c.Writer, menu, status)
}

func newMenuPageableRequest(c *gin.Context) *model.PageableRequest {
	p := &model.PageableRequest{}
	p.Page = utils.PageFromQueryParam(c)
	p.Limit = utils.LimitFromQueryParam(c)
	p.Sort_by = utils.SortValueFromQueryParam(c)
	p.Type = "menu"

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
