package repository

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"

	"gorm.io/gorm"
)

type authRepository struct {
	db *gorm.DB
}

type AuthRepository interface {
	RegisterUser(newUser model.User) (string, error)
	FindUserByLoginInfo(userLogin model.UserLogin) (*model.User, error)
	CheckDuplicateInfo(data model.UserLogin) (int, error)
}

func NewAuthRepository(db *gorm.DB) AuthRepository {
	return &authRepository{
		db: db,
	}
}

func (ar *authRepository) RegisterUser(newUser model.User) (string, error) {
	res := ar.db.Create(&newUser)
	if res.Error != nil {
		return "", res.Error
	}

	return "register success", nil
}

func (ar *authRepository) FindUserByLoginInfo(userLogin model.UserLogin) (*model.User, error) {
	var user *model.User

	findUser := ar.db.
		Where("username ILIKE ? OR email ILIKE ? OR phone ILIKE ?", userLogin.Login, userLogin.Login, userLogin.Login).
		First(&user)

	if findUser.Error != nil {
		return nil, utils.ErrUserNotFound
	}

	return user, nil
}

func (ar *authRepository) CheckDuplicateInfo(data model.UserLogin) (int, error) {
	var count int64;

	findUser := ar.db.
		Model(&model.User{}).
		Where("username ILIKE ? OR email ILIKE ? OR phone ILIKE ?", data.Login, data.Login, data.Login).
		Count(&count)

	if findUser.Error != nil {
		return -1, utils.ErrUserNotFound
	}

	return int(count), nil
}