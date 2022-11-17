package utils

import (
	"errors"
	"fmt"
)

var (
	ErrWalletNotFound         = errorNotFound("wallet")
	ErrNoRoute                = errorNotFound("route")
	ErrUserNotFound           = errorNotFound("user")
	ErrWrongLoginCredential   = NewError("wrong email or password")
	ErrInvalidTopUpAmount     = NewError("invalid amount, should between 50000 and 10000000")
	ErrInvalidTransferAmount  = NewError("invalid amount, should between 1000 and 50000000")
	ErrInvalidSourceOfFunds   = NewError("invalid source of funds, should between 1 and 3")
	ErrTokenInvalid           = NewError("token invalid")
	ErrNoAuthorization        = NewError("no authorization header provided")
	ErrDescriptionLimitExceed = NewError("description length limit is 35 characters")
	ErrInsufficientBalance    = NewError("insufficient balance")
)

func NewError(msg string) error {
	return errors.New(msg)
}

func errorNotFound(entity string) error {
	return fmt.Errorf("%s not found", entity)
}
