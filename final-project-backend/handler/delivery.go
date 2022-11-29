package handler

import (
	"final-project-backend/pkg/utils"
	"final-project-backend/service"

	"github.com/gin-gonic/gin"
)

type DeliveryHandler struct {
	service service.DeliveryService
}

func NewDeliveryHandler(service service.DeliveryService) *DeliveryHandler {
	return &DeliveryHandler{
		service: service,
	}
}

func (dh *DeliveryHandler) GetAllDeliveryStatus(c *gin.Context) {
	deliveryStatus, status, deliveryStatusError := dh.service.GetAllDeliveryStatus()
	if deliveryStatusError != nil {
		utils.ErrorResponse(c.Writer, deliveryStatusError.Error(), status)
	}

	utils.SuccessResponse(c.Writer, deliveryStatus, status)
}
