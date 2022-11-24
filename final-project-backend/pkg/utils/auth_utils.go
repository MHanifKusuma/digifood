package utils

import (
	"errors"
	"final-project-backend/model"
	"net/mail"

	"github.com/gin-gonic/gin"
)

func CheckLoginNotEmpty(login, password string) error {
	if login == "" {
		return errorMustNotEmpty("login info")
	}

	if password == "" {
		return errorMustNotEmpty("password")
	}

	return nil
}

func CheckRegisterValidation(newUser model.User) error {
	emailAndPasswordErr := CheckLoginNotEmpty(newUser.Email, newUser.Password)
	if emailAndPasswordErr != nil {
		return emailAndPasswordErr
	}
	if newUser.FullName == "" {
		return errorMustNotEmpty("full name")
	}
	if newUser.Phone == "" {
		return errorMustNotEmpty("phone")
	}
	if newUser.Username == "" {
		return errorMustNotEmpty("username")
	}
	if _, err := mail.ParseAddress(newUser.Email); err != nil {
		return errors.New("invalid email address")
	}

	return nil
}

func CheckCategoryValidation(name string) error {
	if name == "" {
		return errorMustNotEmpty("category name")
	}

	return nil
}

func QueryParamOrNull(c *gin.Context, key string) interface{} {
	if value := c.Request.FormValue(key); value != "" {
		return value
	}
	return nil
}

func QueryLikeParamOrNull(c *gin.Context, key string) interface{} {
	likeParam := QueryParamOrNull(c, key)
	if likeParam != nil {
		return "%" + likeParam.(string) + "%"
	} else {
		return "%%"
	}
}
