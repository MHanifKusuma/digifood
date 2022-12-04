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
	GetAllMenu(pageable utils.Pageable) (*utils.Page, int, error)
	GetAllMenuByCategory() ([]*model.Category, int, error)
	GetMenuById(id int) (*model.Menu, int, error)
	UpdateMenu(menu model.Menu, deletedMenuOptions []int) (*model.Menu, int, error)
	DeleteMenu(menuId int) (int, int, error)
}

func NewMenuService(repository repository.MenuRepository) MenuService {
	return &menuService{
		repository: repository,
	}
}

func (ms *menuService) GetAllMenu(pageable utils.Pageable) (*utils.Page, int, error) {
	data, dataError := ms.repository.GetAllMenu(pageable)
	if dataError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return data, http.StatusOK, nil
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

func (ms *menuService) UpdateMenu(menu model.Menu, deletedMenuOptions []int) (*model.Menu, int, error) {
	_, isFound, _ := ms.GetMenuById(menu.Id)
	if isFound != 200 {
		return nil, http.StatusNotFound, utils.ErrMenuNotFound
	}

	if len(deletedMenuOptions) > 0 {
		_, deleteMenuOptionstatus, deleteMenuOptionError := ms.DeleteMenuOptions(deletedMenuOptions)
		if deleteMenuOptionError != nil {
			return nil, deleteMenuOptionstatus, deleteMenuOptionError
		}
	}

	updatedMenu, updateMenuError := ms.repository.UpdateMenu(menu)
	if updateMenuError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return updatedMenu, http.StatusOK, nil
}

func (ms *menuService) DeleteMenuOptions(optionIds []int) (string, int, error) {
	deleteMessage, deleteError := ms.repository.DeleteMenuOptions(optionIds)
	if deleteError != nil {
		return deleteMessage, http.StatusInternalServerError, deleteError
	}

	return deleteMessage, http.StatusOK, nil
}

func (ms *menuService) DeleteMenu(menuId int) (int, int, error) {
	menu, menuStatus, menuError := ms.GetMenuById(menuId)
	if menuError != nil {
		return -1, menuStatus, menuError
	}

	deletedId, deleteError := ms.repository.DeleteMenu(menu.Id)
	if deleteError != nil {
		return -1, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return deletedId, http.StatusOK, nil
}