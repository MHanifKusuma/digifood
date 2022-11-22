package repository

import (
	"final-project-backend/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type menuRepository struct {
	db *gorm.DB
}

type MenuRepository interface {
	GetAllMenu() ([]*model.Menu, error)
	GetAllMenuByCategory() ([]*model.Category, error)
	GetMenuById(id int) (*model.Menu, error)
}

func NewMenuRepository(db *gorm.DB) MenuRepository {
	return &menuRepository{
		db: db,
	}
}

func (mr *menuRepository) GetAllMenu() ([]*model.Menu, error) {
	var menus []*model.Menu

	res := mr.db.Model(&model.Menu{}).Preload(clause.Associations).Find(&menus)
	if res.Error != nil {
		return nil, res.Error
	}

	return menus, nil
}

func (mr *menuRepository) GetAllMenuByCategory() ([]*model.Category, error) {
	var menus []*model.Category

	res := mr.db.Model(&model.Category{}).Preload(clause.Associations).Order("id asc").Find(&menus)
	if res.Error != nil {
		return nil, res.Error
	}

	return menus, nil
}

func (mr *menuRepository) GetMenuById(id int) (*model.Menu, error) {
	var menu *model.Menu

	res := mr.db.Model(&model.Menu{}).Preload(clause.Associations).Find(&menu)
	if res != nil {
		return nil, res.Error
	}

	return menu, nil
}
