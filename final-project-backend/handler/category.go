package handler

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct {
	service service.CategoryService
}

func NewCategoryHandler(service service.CategoryService) *CategoryHandler {
	return &CategoryHandler{
		service: service,
	}
}

func (ch *CategoryHandler) GetAllCategory(c *gin.Context) {
	categoryList, status, categoryListError := ch.service.GetAllCategory()
	if categoryListError != nil {
		utils.ErrorResponse(c.Writer, categoryListError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, categoryList, status)
}

func (ch *CategoryHandler) UpdateCategory(c *gin.Context) {
	var category model.Category

	if bindJsonError := c.ShouldBindJSON(&category); bindJsonError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
		return
	}

	validationError := utils.CheckCategoryValidation(category.Name)
	if validationError != nil {
		utils.ErrorResponse(c.Writer, validationError.Error(), http.StatusBadRequest)
		return
	}

	msg, status, updateCategoryError := ch.service.UpdateCategory(category)
	if updateCategoryError != nil {
		utils.ErrorResponse(c.Writer, updateCategoryError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, msg, status)
}

func (ch *CategoryHandler) DeleteCategory(c *gin.Context) {
	var category model.Category

	if bindJsonError := c.ShouldBindJSON(&category); bindJsonError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
		return
	}

	msg, status, updateCategoryError := ch.service.DeleteCategory(category)
	if updateCategoryError != nil {
		utils.ErrorResponse(c.Writer, updateCategoryError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, msg, status)

}
