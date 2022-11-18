package handler

import (
	"encoding/json"
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/service"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	service service.AuthService
}

func NewAuthHandler(service service.AuthService) *AuthHandler {
	return &AuthHandler{
		service: service,
	}
}

func (ah *AuthHandler) Login(c *gin.Context) {

	reqBody, _ := io.ReadAll(c.Request.Body)

	var loginInfo *model.UserLogin

	jsonErr := json.Unmarshal(reqBody, &loginInfo)
	if jsonErr != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
		return
	}

	checkInputError := utils.CheckLoginNotEmpty(loginInfo.Login, loginInfo.Password)
	if checkInputError != nil {
		utils.ErrorResponse(c.Writer, checkInputError.Error(), http.StatusBadRequest)
		return
	}

	token, status, loginError := ah.service.Login(loginInfo)
	if loginError != nil {
		utils.ErrorResponse(c.Writer, loginError.Error(), status)
		return
	}

	responseJson := struct {
		Token string `response:"token"`
	}{
		Token: token,
	}

	utils.SuccessResponse(c.Writer, responseJson, status)
}

func (ah *AuthHandler) Register(c *gin.Context) {
	var newUser model.User

	if bindJsonError := c.ShouldBindJSON(&newUser); bindJsonError != nil {
		utils.ErrorResponse(c.Writer, utils.ErrConvertRequesData.Error(), http.StatusBadRequest)
		return
	}

	newUser.Role = 1

	validationError := utils.CheckRegisterValidation(newUser)
	if validationError != nil {
		utils.ErrorResponse(c.Writer, validationError.Error(), http.StatusBadRequest)
		return
	}

	msg, status, registerError := ah.service.RegisterUser(&newUser)
	if registerError != nil {
		utils.ErrorResponse(c.Writer, registerError.Error(), status)
		return
	}

	utils.SuccessResponse(c.Writer, msg, status)
}
