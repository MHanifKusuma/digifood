package handler

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service service.UserService
}

func NewUserHandler(service service.UserService) *UserHandler {
	return &UserHandler{
		service: service,
	}
}

func (uh *UserHandler) GetUserProfile(c *gin.Context) {
	getUserId, userExists := c.Get("user_id")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}

	id := getUserId.(string)
	userId, _ := strconv.Atoi(id)

	user, status, userError := uh.service.GetUserProfile(userId)
	if userError != nil {
		utils.ErrorResponse(c.Writer, userError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, user, status)
}

func (uh *UserHandler) AddFavorite(c *gin.Context) {
	var newFavorite model.NewUserFavorite

	getUserId, userExists := c.Get("user_id")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}
	id := getUserId.(string)
	userId, _ := strconv.Atoi(id)

	if bindJsonError := c.ShouldBindJSON(&newFavorite); bindJsonError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
		return
	}

	newFavorite.UserId = userId

	message, status, addFavoriteError := uh.service.AddUserFavorite(newFavorite)
	if addFavoriteError != nil {
		utils.ErrorResponse(c.Writer, addFavoriteError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, message, status)
}

func (uh *UserHandler) UpdateUserProfile(c *gin.Context) {
	var user model.User

	if bindJsonError := c.ShouldBindJSON(&user); bindJsonError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
		return
	}

	getUserId, userExists := c.Get("user_id")
	if !userExists {
		utils.ErrorResponse(c.Writer, utils.ErrUserNotFound.Error(), http.StatusUnauthorized)
		return
	}
	id := getUserId.(string)
	userId, _ := strconv.Atoi(id)

	user.Id = userId

	message, status, updateError := uh.service.UpdateUserProfile(user)
	if updateError != nil {
		utils.ErrorResponse(c.Writer, updateError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, message, status)
}
