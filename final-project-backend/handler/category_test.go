package handler

import (
	"errors"
	"final-project-backend/mocks"
	"final-project-backend/model"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestGetAllCategory(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		s := mocks.NewCategoryService(t)
		h := NewCategoryHandler(s)

		s.On("GetAllCategory").Return(nil, http.StatusOK, nil)

		router := gin.Default()
		router.GET("/categories", h.GetAllCategory)

		req := httptest.NewRequest("GET", "/categories", nil)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusOK, res.Result().StatusCode)
	})

	t.Run("failed", func(t *testing.T) {
		s := mocks.NewCategoryService(t)
		h := NewCategoryHandler(s)

		s.On("GetAllCategory").Return(nil, http.StatusInternalServerError, errors.New("error"))

		router := gin.Default()
		router.GET("/categories", h.GetAllCategory)

		req := httptest.NewRequest("GET", "/categories", nil)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusInternalServerError, res.Result().StatusCode)
	})
}

func TestUpdateCategory(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		payload := model.Category{
			Id:   1,
			Name: "category1",
		}

		jsonBody := `{
		"id":1,
		"name":"category1"
		}`
		body := strings.NewReader(jsonBody)

		s := mocks.NewCategoryService(t)
		h := NewCategoryHandler(s)

		s.On("UpdateCategory", payload).Return("success", http.StatusOK, nil)

		router := gin.Default()
		router.PUT("/categories", h.UpdateCategory)

		req := httptest.NewRequest("PUT", "/categories", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusOK, res.Result().StatusCode)
	})

	t.Run("failed-invalid-request-body", func(t *testing.T) {
		jsonBody := `{
		"id":"1"
		"name":"category1"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewCategoryService(t)
		h := NewCategoryHandler(s)

		router := gin.Default()
		router.PUT("/categories", h.UpdateCategory)

		req := httptest.NewRequest("PUT", "/categories", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusBadRequest, res.Result().StatusCode)

	})

	t.Run("failed-empty-input", func(t *testing.T) {
		jsonBody := `{
		"id":1
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewCategoryService(t)
		h := NewCategoryHandler(s)

		router := gin.Default()
		router.POST("/login", h.UpdateCategory)

		req := httptest.NewRequest("POST", "/login", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusBadRequest, res.Result().StatusCode)
	})

	t.Run("failed-not-found", func(t *testing.T) {
		payload := model.Category{
			Id:   1,
			Name: "category1",
		}

		jsonBody := `{
		"id":1,
		"name":"category1"
		}`
		body := strings.NewReader(jsonBody)

		s := mocks.NewCategoryService(t)
		h := NewCategoryHandler(s)

		s.On("UpdateCategory", payload).Return("", http.StatusNotFound, errors.New("not found"))

		router := gin.Default()
		router.PUT("/categories", h.UpdateCategory)

		req := httptest.NewRequest("PUT", "/categories", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusNotFound, res.Result().StatusCode)
	})
}
func TestDeleteCategory(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		payload := model.Category{
			Id:   1,
			Name: "category1",
		}

		jsonBody := `{
		"id":1,
		"name":"category1"
		}`
		body := strings.NewReader(jsonBody)

		s := mocks.NewCategoryService(t)
		h := NewCategoryHandler(s)

		s.On("DeleteCategory", payload).Return("success", http.StatusOK, nil)

		router := gin.Default()
		router.DELETE("/categories", h.DeleteCategory)

		req := httptest.NewRequest("DELETE", "/categories", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusOK, res.Result().StatusCode)
	})

	t.Run("failed-invalid-request-body", func(t *testing.T) {
		jsonBody := `{
		"id":"1"
		"name":"category1"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewCategoryService(t)
		h := NewCategoryHandler(s)

		router := gin.Default()
		router.DELETE("/categories", h.DeleteCategory)

		req := httptest.NewRequest("DELETE", "/categories", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusBadRequest, res.Result().StatusCode)

	})

	t.Run("success", func(t *testing.T) {
		payload := model.Category{
			Id:   1,
			Name: "category1",
		}

		jsonBody := `{
		"id":1,
		"name":"category1"
		}`
		body := strings.NewReader(jsonBody)

		s := mocks.NewCategoryService(t)
		h := NewCategoryHandler(s)

		s.On("DeleteCategory", payload).Return("success", http.StatusInternalServerError, errors.New("unexpected"))

		router := gin.Default()
		router.DELETE("/categories", h.DeleteCategory)

		req := httptest.NewRequest("DELETE", "/categories", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusInternalServerError, res.Result().StatusCode)
	})
}
