package utils

import (
	"errors"
	"final-project-backend/model"
	"net/mail"
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
