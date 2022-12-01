// Code generated by mockery v2.14.0. DO NOT EDIT.

package mocks

import (
	model "final-project-backend/model"

	mock "github.com/stretchr/testify/mock"
)

// AuthService is an autogenerated mock type for the AuthService type
type AuthService struct {
	mock.Mock
}

// CheckDuplicateUserData provides a mock function with given fields: data
func (_m *AuthService) CheckDuplicateUserData(data *model.User) (int, error) {
	ret := _m.Called(data)

	var r0 int
	if rf, ok := ret.Get(0).(func(*model.User) int); ok {
		r0 = rf(data)
	} else {
		r0 = ret.Get(0).(int)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(*model.User) error); ok {
		r1 = rf(data)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Login provides a mock function with given fields: loginUser
func (_m *AuthService) Login(loginUser *model.UserLogin) (string, int, error) {
	ret := _m.Called(loginUser)

	var r0 string
	if rf, ok := ret.Get(0).(func(*model.UserLogin) string); ok {
		r0 = rf(loginUser)
	} else {
		r0 = ret.Get(0).(string)
	}

	var r1 int
	if rf, ok := ret.Get(1).(func(*model.UserLogin) int); ok {
		r1 = rf(loginUser)
	} else {
		r1 = ret.Get(1).(int)
	}

	var r2 error
	if rf, ok := ret.Get(2).(func(*model.UserLogin) error); ok {
		r2 = rf(loginUser)
	} else {
		r2 = ret.Error(2)
	}

	return r0, r1, r2
}

// RegisterUser provides a mock function with given fields: newUser
func (_m *AuthService) RegisterUser(newUser *model.User) (string, int, error) {
	ret := _m.Called(newUser)

	var r0 string
	if rf, ok := ret.Get(0).(func(*model.User) string); ok {
		r0 = rf(newUser)
	} else {
		r0 = ret.Get(0).(string)
	}

	var r1 int
	if rf, ok := ret.Get(1).(func(*model.User) int); ok {
		r1 = rf(newUser)
	} else {
		r1 = ret.Get(1).(int)
	}

	var r2 error
	if rf, ok := ret.Get(2).(func(*model.User) error); ok {
		r2 = rf(newUser)
	} else {
		r2 = ret.Error(2)
	}

	return r0, r1, r2
}

type mockConstructorTestingTNewAuthService interface {
	mock.TestingT
	Cleanup(func())
}

// NewAuthService creates a new instance of AuthService. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewAuthService(t mockConstructorTestingTNewAuthService) *AuthService {
	mock := &AuthService{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
