package service

import (
	"errors"
	"final-project-backend/mocks"
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetAllCategory(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		categoryRepo := mocks.NewCategoryRepository(t)
		categoryRepo.On("GetAllCategory").Return([]*model.Category{
			{Id: 1, Name: "category1"},
			{Id: 2, Name: "category2"},
		}, nil)

		expectedResult := []*model.Category{
			{Id: 1, Name: "category1"},
			{Id: 2, Name: "category2"},
		}

		categoryService := NewCategoryService(categoryRepo)
		categories, _, err := categoryService.GetAllCategory()
		assert.Nil(t, err)
		assert.Equal(t, expectedResult, categories)

	})
	t.Run("failed", func(t *testing.T) {
		categoryRepo := mocks.NewCategoryRepository(t)
		categoryRepo.On("GetAllCategory").Return(nil, utils.ErrNotExpected)

		categoryService := NewCategoryService(categoryRepo)
		_, _, err := categoryService.GetAllCategory()
		assert.NotNil(t, err)

	})
}

func TestGetCategoryById(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		categoryRepo := mocks.NewCategoryRepository(t)
		categoryRepo.On("GetCategoryById", 1).Return(&model.Category{Id: 1, Name: "category1"}, nil)

		categoryService := NewCategoryService(categoryRepo)
		_, status, err := categoryService.GetCategoryById(1)
		assert.Nil(t, err)
		assert.Equal(t, http.StatusOK, status)
	})
	t.Run("failed", func(t *testing.T) {
		categoryRepo := mocks.NewCategoryRepository(t)
		categoryRepo.On("GetCategoryById", 1).Return(nil, errors.New("error"))

		categoryService := NewCategoryService(categoryRepo)
		_, status, err := categoryService.GetCategoryById(1)
		assert.NotNil(t, err)
		assert.Equal(t, http.StatusNotFound, status)
	})
}

func TestUpdateCategory(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		categoryRepo := mocks.NewCategoryRepository(t)
		categoryRepo.On("GetCategoryById", 1).Return(&model.Category{Id: 1, Name: "category1"}, nil)
		categoryRepo.On("UpdateCategory", 1, "categoryTest").Return("success", nil)

		categoryToUpdate := model.Category{
			Id:   1,
			Name: "categoryTest",
		}

		categoryService := NewCategoryService(categoryRepo)
		_, status, err := categoryService.UpdateCategory(categoryToUpdate)
		assert.Nil(t, err)
		assert.Equal(t, http.StatusOK, status)
	})

	t.Run("failed-not-found", func(t *testing.T) {
		categoryRepo := mocks.NewCategoryRepository(t)
		categoryRepo.On("GetCategoryById", 1).Return(nil, errors.New("not found"))

		categoryToUpdate := model.Category{
			Id:   1,
			Name: "categoryTest",
		}

		categoryService := NewCategoryService(categoryRepo)
		_, status, err := categoryService.UpdateCategory(categoryToUpdate)
		assert.NotNil(t, err)
		assert.Equal(t, http.StatusNotFound, status)
	})

	t.Run("failed-unexpected", func(t *testing.T) {
		categoryRepo := mocks.NewCategoryRepository(t)
		categoryRepo.On("GetCategoryById", 1).Return(&model.Category{Id: 1, Name: "category1"}, nil)
		categoryRepo.On("UpdateCategory", 1, "categoryTest").Return("", errors.New("error"))

		categoryToUpdate := model.Category{
			Id:   1,
			Name: "categoryTest",
		}

		categoryService := NewCategoryService(categoryRepo)
		_, status, err := categoryService.UpdateCategory(categoryToUpdate)
		assert.NotNil(t, err)
		assert.Equal(t, http.StatusInternalServerError, status)
	})
}

func TestDeleteCategory(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		categoryToDelete := model.Category{
			Id:   1,
			Name: "categoryTest",
		}

		categoryRepo := mocks.NewCategoryRepository(t)
		categoryRepo.On("DeleteCategory", &categoryToDelete).Return("success", nil)

		categoryService := NewCategoryService(categoryRepo)
		_, status, err := categoryService.DeleteCategory(categoryToDelete)
		assert.Nil(t, err)
		assert.Equal(t, http.StatusOK, status)
	})
	t.Run("failed", func(t *testing.T) {
		categoryToDelete := model.Category{
			Id:   1,
			Name: "categoryTest",
		}

		categoryRepo := mocks.NewCategoryRepository(t)
		categoryRepo.On("DeleteCategory", &categoryToDelete).Return("", errors.New("error"))

		categoryService := NewCategoryService(categoryRepo)
		_, status, err := categoryService.DeleteCategory(categoryToDelete)
		assert.NotNil(t, err)
		assert.Equal(t, http.StatusBadRequest, status)
	})
}
