package service

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/repository"
	"net/http"
)

type menuService struct {
	repository repository.MenuRepository
}

type MenuService interface {
	GetAllMenu() ([]*model.Menu, int, error)
	GetAllMenuByCategory() ([]*model.Category, int, error)
	GetMenuById(id int) (*model.Menu, int, error)
}

func NewMenuService(repository repository.MenuRepository) MenuService {
	return &menuService{
		repository: repository,
	}
}

func (ms *menuService) GetAllMenu() ([]*model.Menu, int, error) {
	allMenu, allMenuError := ms.repository.GetAllMenu()
	if allMenuError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return allMenu, http.StatusOK, nil
}

func (ms *menuService) GetAllMenuByCategory() ([]*model.Category, int, error) {
	allMenuByCategory, allMenuByCategoryError := ms.repository.GetAllMenuByCategory()
	if allMenuByCategoryError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return allMenuByCategory, http.StatusOK, nil
}

func (ms *menuService) GetMenuById(id int) (*model.Menu, int, error) {
	menuById, menuByIdError := ms.repository.GetMenuById(id)
	if menuByIdError != nil {
		return nil, http.StatusNotFound, utils.ErrMenuNotFound
	}

	return menuById, http.StatusOK, nil
}
