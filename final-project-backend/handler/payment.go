package handler

import (
	"final-project-backend/pkg/utils"
	"final-project-backend/service"

	"github.com/gin-gonic/gin"
)

type PaymentHandler struct {
	service service.PaymentService
}

func NewPaymentHandler(service service.PaymentService) *PaymentHandler {
	return &PaymentHandler{
		service: service,
	}
}

func (ph *PaymentHandler) GetAllPaymentOptions(c *gin.Context) {
	options, status, optionsError := ph.service.GetAllPaymentOptions()
	if optionsError != nil {
		utils.ErrorResponse(c.Writer, optionsError.Error(), status)
	}

	utils.SuccessResponse(c.Writer, options, status)
}
