package utils

import (
	"errors"
	"fmt"
)

var (
	ErrNoRoute               = errorNotFound("route")
	ErrUserNotFound          = errorNotFound("user")
	ErrCategoryNotFound      = errorNotFound("category")
	ErrMenuNotFound          = errorNotFound("menu")
	ErrCouponNotFound        = errorNotFound("coupon")
	ErrPaymentOptionNotFound = errorNotFound("payment option")
	ErrWrongLoginCredential  = NewError("wrong credentials")
	ErrNoAuthorization       = NewError("no authorization header provided")
	ErrEmailExists           = NewError("email already exists")
	ErrPhoneExists           = NewError("phone number already exists")
	ErrUsernameExists        = NewError("username already exists")
	ErrNotExpected           = NewError("unexpected error occured, please try again later")
	ErrTokenInvalid          = NewError("token invalid")
	ErrConvertRequesData     = NewError("invalid request data")
)

func NewError(msg string) error {
	return errors.New(msg)
}

func errorNotFound(entity string) error {
	return fmt.Errorf("%s not found", entity)
}

func errorMustNotEmpty(message string) error {
	return fmt.Errorf("%s must not be empty", message)
}
