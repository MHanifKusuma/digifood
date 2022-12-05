package utils

import (
	"errors"
	"fmt"
)

var (
	ErrNoRoute                = errorNotFound("route")
	ErrUserNotFound           = errorNotFound("user")
	ErrCategoryNotFound       = errorNotFound("category")
	ErrMenuNotFound           = errorNotFound("menu")
	ErrCouponNotFound         = errorNotFound("coupon")
	ErrPaymentOptionNotFound  = errorNotFound("payment option")
	ErrDeliveryStatusNotFound = errorNotFound("delivery status")
	ErrOrderNotFound          = errorNotFound("order")
	ErrWrongLoginCredential   = NewError("wrong credentials")
	ErrNoAuthorization        = NewError("no authorization header provided")
	ErrEmailExists            = NewError("email already exists")
	ErrPhoneExists            = NewError("phone number already exists")
	ErrUsernameExists         = NewError("username already exists")
	ErrMenuExists             = NewError("menu already exists")
	ErrCouponExists 		= NewError("coupon already exists")
	ErrNotExpected            = NewError("unexpected error occured, please try again later")
	ErrTokenInvalid           = NewError("token invalid")
	ErrConvertRequesData      = NewError("invalid request data")
	ErrPageRestricted         = NewError("page restricted")
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
