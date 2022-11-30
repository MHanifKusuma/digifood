package repository

import (
	"final-project-backend/model"

	"gorm.io/gorm"
)

type userRepository struct {
	db *gorm.DB
}

type UserRepository interface {
	GetUserProfile(userId int) (*model.User, error)
	AddUserFavorite(newFavorite model.NewUserFavorite) (string, error)
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{
		db: db,
	}
}

func (ur *userRepository) GetUserProfile(userId int) (*model.User, error) {
	var user *model.User

	res := ur.db.
		Preload("UserFavorite").Preload("UserFavorite.Menu").
		Where("id = ?", userId).
		Find(&user)
	if res.Error != nil {
		return nil, res.Error
	}

	return user, nil
}

func (ur *userRepository) AddUserFavorite(newFavorite model.NewUserFavorite) (string, error) {
	var userFavorite = model.UserFavorites{
		UserId: newFavorite.UserId,
		MenuId: newFavorite.MenuId,
	}

	res := ur.db.Create(&userFavorite)
	if res.Error != nil {
		return "", res.Error
	}

	return "add user favorite success", nil
}
