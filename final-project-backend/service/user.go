package service

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/repository"
	"net/http"
)

type userService struct {
	repository  repository.UserRepository
	menuService MenuService
	authService AuthService
}

type UserService interface {
	GetUserProfile(userId int) (*model.UserResponse, int, error)
	AddUserFavorite(newFavorite model.NewUserFavorite) (string, int, error)
	UpdateUserProfile(data model.User) (string, int, error)
}

func NewUserService(repository repository.UserRepository, menuService MenuService, authService AuthService) UserService {
	return &userService{
		repository:  repository,
		menuService: menuService,
		authService: authService,
	}
}

func (us *userService) GetUserProfile(userId int) (*model.UserResponse, int, error) {
	user, userError := us.repository.GetUserProfile(userId)
	if userError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return user, http.StatusOK, nil
}

func (us *userService) AddUserFavorite(newFavorite model.NewUserFavorite) (string, int, error) {
	_, status, checkMenuError := us.menuService.GetMenuById(newFavorite.MenuId)
	if checkMenuError != nil {
		return "menu not found", status, checkMenuError
	}

	message, menuError := us.repository.AddUserFavorite(newFavorite)
	if menuError != nil {
		return message, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return message, http.StatusOK, nil
}

func (us *userService) UpdateUserProfile(user model.User) (string, int, error) {
	checkDuplicateStatus, checkDuplicateError := us.authService.CheckDuplicateUserData(&user)
	if checkDuplicateError != nil {
		return "error", checkDuplicateStatus, checkDuplicateError
	}

	userId := user.Id
	data := map[string]interface{}{
		"full_name":       user.FullName,
		"email":           user.Email,
		"phone":           user.Phone,
		"username":        user.Username,
		"profile_picture": user.ProfilePicture,
	}

	message, updateError := us.repository.UpdateUserProfile(userId, data)
	if updateError != nil {
		return "", http.StatusNotFound, utils.ErrUserNotFound
	}

	return message, http.StatusOK, nil

}
