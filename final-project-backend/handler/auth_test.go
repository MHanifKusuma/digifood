package handler

import (
	"final-project-backend/mocks"
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/assert/v2"
)

func TestLogin(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		payload := &model.UserLogin{
			Login:    "user.one@email.com",
			Password: "userone123!",
		}

		jsonBody := `{
		"login":"user.one@email.com",
		"password":"userone123!"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewAuthService(t)
		h := NewAuthHandler(s)

		s.On("Login", payload).Return("", http.StatusOK, nil)

		router := gin.Default()
		router.POST("/login", h.Login)

		req := httptest.NewRequest("POST", "/login", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusOK, res.Result().StatusCode)

	})

	t.Run("failed-invalid-request-body", func(t *testing.T) {
		jsonBody := `{
		"email":"user.one@email.com"
		"password":"userone123!"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewAuthService(t)
		h := NewAuthHandler(s)

		router := gin.Default()
		router.POST("/login", h.Login)

		req := httptest.NewRequest("POST", "/login", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusBadRequest, res.Result().StatusCode)

	})

	t.Run("failed-empty-input", func(t *testing.T) {
		jsonBody := `{
		"login":"user.one@email.com"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewAuthService(t)
		h := NewAuthHandler(s)

		router := gin.Default()
		router.POST("/login", h.Login)

		req := httptest.NewRequest("POST", "/login", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusBadRequest, res.Result().StatusCode)

	})

	t.Run("failed-wrong-credentials", func(t *testing.T) {
		payload := &model.UserLogin{
			Login:    "user.one@email.com",
			Password: "userone!",
		}

		jsonBody := `{
		"login":"user.one@email.com",
		"password":"userone!"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewAuthService(t)
		h := NewAuthHandler(s)

		s.On("Login", payload).Return("", http.StatusForbidden, utils.ErrWrongLoginCredential)

		router := gin.Default()
		router.POST("/login", h.Login)

		req := httptest.NewRequest("POST", "/login", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusForbidden, res.Result().StatusCode)

	})
}

func TestRegister(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		payload := &model.User{
			FullName: "user test",
			Phone:    "098263748374",
			Email:    "user.test@email.com",
			Username: "usertest",
			Password: "usertest123!",
			Role:     1,
		}

		jsonBody := `{
			"fullName": "user test",
			"phone": "098263748374",
			"email": "user.test@email.com",
			"username": "usertest",
			"password": "usertest123!"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewAuthService(t)
		h := NewAuthHandler(s)

		s.On("RegisterUser", payload).Return("", http.StatusCreated, nil)

		router := gin.Default()
		router.POST("/register", h.Register)

		req := httptest.NewRequest("POST", "/register", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusCreated, res.Result().StatusCode)
	})

	t.Run("failed-invalid-request-body", func(t *testing.T) {
		jsonBody := `{
			"fullName": "user test",
			"phone": "098263748374"
			"email": "user.test@email.com",
			"username": "usertest",
			"password": "usertest123!"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewAuthService(t)
		h := NewAuthHandler(s)

		router := gin.Default()
		router.POST("/register", h.Register)

		req := httptest.NewRequest("POST", "/register", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusBadRequest, res.Result().StatusCode)
	})

	t.Run("failed-empty-input", func(t *testing.T) {
		jsonBody := `{
			"fullName": "user test",
			"phone": "098263748374",
			"email": "user.test@email.com",
			"password": "usertest123!"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewAuthService(t)
		h := NewAuthHandler(s)

		router := gin.Default()
		router.POST("/register", h.Register)

		req := httptest.NewRequest("POST", "/register", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)
		assert.Equal(t, http.StatusBadRequest, res.Result().StatusCode)
	})

	t.Run("failed-user-exist", func(t *testing.T) {
		payload := &model.User{
			FullName: "user test",
			Phone:    "098263748374",
			Email:    "user.test@email.com",
			Username: "usertest",
			Password: "usertest123!",
			Role:     1,
		}

		jsonBody := `{
			"fullName": "user test",
			"phone": "098263748374",
			"email": "user.test@email.com",
			"username": "usertest",
			"password": "usertest123!"
		}`

		body := strings.NewReader(jsonBody)

		s := mocks.NewAuthService(t)
		h := NewAuthHandler(s)

		s.On("RegisterUser", payload).Return("", http.StatusConflict, utils.ErrUserExist)

		router := gin.Default()
		router.POST("/register", h.Register)

		req := httptest.NewRequest("POST", "/register", body)
		res := httptest.NewRecorder()

		router.ServeHTTP(res, req)

		assert.Equal(t, http.StatusConflict, res.Result().StatusCode)
	})
}
