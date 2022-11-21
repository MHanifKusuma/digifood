package service

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/repository"
	"net/http"
)

type categoryService struct {
	repository repository.CategoryRepository
}

type CategoryService interface {
	GetAllCategory() ([]*model.Category, int, error)
	GetCategoryById(id int) (*model.Category, int, error)
	UpdateCategory(category model.Category) (string, int, error)
	DeleteCategory(category model.Category) (string, int, error)
}

func NewCategoryService(repository repository.CategoryRepository) CategoryService {
	return &categoryService{
		repository: repository,
	}
}

func (cs *categoryService) GetAllCategory() ([]*model.Category, int, error) {
	categoryList, categoryListError := cs.repository.GetAllCategory()
	if categoryListError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return categoryList, http.StatusOK, categoryListError
}

func (cs *categoryService) GetCategoryById(id int) (*model.Category, int, error) {
	category, categoryError := cs.repository.GetCategoryById(id)
	if categoryError != nil {
		return nil, http.StatusNotFound, utils.ErrCategoryNotFound
	}

	return category, http.StatusOK, nil
}

func (cs *categoryService) UpdateCategory(category model.Category) (string, int, error) {
	foundCategory, findCategoryError := cs.repository.GetCategoryById(category.Id)
	if findCategoryError != nil {
		return "", http.StatusNotFound, utils.ErrCategoryNotFound
	}

	foundCategory.Name = category.Name

	updateMessage, updateError := cs.repository.UpdateCategory(foundCategory.Id, foundCategory.Name)
	if updateError != nil {
		return "", http.StatusInternalServerError, utils.ErrNotExpected
	}

	return updateMessage, http.StatusOK, nil
}

func (cs *categoryService) DeleteCategory(category model.Category) (string, int, error) {
	deleteMessage, deleteError := cs.repository.DeleteCategory(&category)
	if deleteError != nil {
		return "", http.StatusBadRequest, deleteError
	}

	return deleteMessage, http.StatusOK, nil
}
