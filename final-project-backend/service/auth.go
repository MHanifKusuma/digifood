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
	hashedPassword, hashError := utils.HashAndSalt(newUser.Password)
	if hashError != nil {
		return "", http.StatusInternalServerError, utils.ErrNotExpected
	}
	newUser.Password = hashedPassword

	findUser := model.UserLogin{
		Login:    newUser.Email,
		Password: newUser.Password,
	}

	user, _ := as.repository.FindUserByLoginInfo(findUser)
	if user != nil {
		return "", http.StatusConflict, utils.ErrUserExist
	}

	msg, registerError := as.repository.RegisterUser(*newUser)
	if registerError != nil {
		return "", http.StatusInternalServerError, utils.ErrNotExpected
	}

	return msg, http.StatusCreated, nil
}
