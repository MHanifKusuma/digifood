package service

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/pkg/utils/jwt"
	"final-project-backend/repository"
	"fmt"
	"net/http"
)

type authService struct {
	repository repository.AuthRepository
}

type AuthService interface {
	Login(loginUser *model.UserLogin) (string, int, error)
	RegisterUser(newUser *model.User) (string, int, error)
	CheckDuplicateUserData(data *model.User) (int, error)
}

func NewAuthService(repository repository.AuthRepository) AuthService {
	return &authService{
		repository: repository,
	}
}

func (as *authService) Login(loginUser *model.UserLogin) (string, int, error) {
	user, err := as.repository.FindUserByLoginInfo(*loginUser)
	if err != nil {
		return "", http.StatusNotFound, err
	}

	if !utils.ComparePassword(user.Password, loginUser.Password) {
		return "", http.StatusForbidden, utils.ErrWrongLoginCredential
	}

	token, err := jwt.GenerateToken(fmt.Sprintf("%d", user.Id))
	if err != nil {
		return "", http.StatusInternalServerError, utils.ErrNotExpected
	}

	return token, http.StatusOK, nil
}

func (as *authService) RegisterUser(newUser *model.User) (string, int, error) {
	findUserEmail := model.UserLogin{
		Login:    newUser.Email,
		Password: newUser.Password,
	}

	user, _ := as.repository.FindUserByLoginInfo(findUserEmail)
	if user != nil {
		return "", http.StatusConflict, utils.ErrEmailExists
	}

	findUserPhone := model.UserLogin{
		Login:    newUser.Phone,
		Password: newUser.Password,
	}

	user, _ = as.repository.FindUserByLoginInfo(findUserPhone)
	if user != nil {
		return "", http.StatusConflict, utils.ErrPhoneExists
	}

	findUserUsername := model.UserLogin{
		Login:    newUser.Username,
		Password: newUser.Password,
	}

	user, _ = as.repository.FindUserByLoginInfo(findUserUsername)
	if user != nil {
		return "", http.StatusConflict, utils.ErrUsernameExists
	}

	hashedPassword, hashError := utils.HashAndSalt(newUser.Password)
	if hashError != nil {
		return "", http.StatusInternalServerError, utils.ErrNotExpected
	}
	newUser.Password = hashedPassword

	msg, registerError := as.repository.RegisterUser(*newUser)
	if registerError != nil {
		return "", http.StatusInternalServerError, utils.ErrNotExpected
	}

	return msg, http.StatusCreated, nil
}

func (as *authService) CheckDuplicateUserData(data *model.User) (int, error) {
	findUserEmail := model.UserLogin{
		Login:    data.Email,
		Password: data.Password,
	}

	user, _ := as.repository.CheckDuplicateInfo(findUserEmail)
	if user > 1 {
		return http.StatusConflict, utils.ErrEmailExists
	}

	findUserPhone := model.UserLogin{
		Login:    data.Phone,
		Password: data.Password,
	}

	user, _ = as.repository.CheckDuplicateInfo(findUserPhone)
	if user > 1 {
		return http.StatusConflict, utils.ErrPhoneExists
	}

	findUserUsername := model.UserLogin{
		Login:    data.Username,
		Password: data.Password,
	}

	user, _ = as.repository.CheckDuplicateInfo(findUserUsername)
	if user > 1 {
		return http.StatusConflict, utils.ErrUsernameExists
	}

	if user < 0 {
		return http.StatusInternalServerError, utils.ErrNotExpected
	}

	return http.StatusOK, nil
}
