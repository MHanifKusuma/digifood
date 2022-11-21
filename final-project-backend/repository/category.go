package repository

import (
	"final-project-backend/model"

	"gorm.io/gorm"
)

type categoryRepository struct {
	db *gorm.DB
}

type CategoryRepository interface {
	GetAllCategory() ([]*model.Category, error)
	UpdateCategory(id int, name string) (string, error)
	DeleteCategory(category *model.Category) (string, error)
	GetCategoryById(id int) (*model.Category, error)
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{
		db: db,
	}
}

func (cr *categoryRepository) GetAllCategory() ([]*model.Category, error) {
	var categories []*model.Category

	res := cr.db.Order("id ASC").Find(&categories)
	if res.Error != nil {
		return nil, res.Error
	}

	return categories, nil
}

func (cr *categoryRepository) GetCategoryById(id int) (*model.Category, error) {
	var category *model.Category

	res := cr.db.First(&category, id)
	if res.Error != nil {
		return nil, res.Error
	}

	return category, nil
}

func (cr *categoryRepository) UpdateCategory(id int, name string) (string, error) {
	res := cr.db.Model(&model.Category{}).Where("id = ?", id).Update("name", name)
	if res.Error != nil {
		return "", res.Error
	}

	return "update success", nil
}

func (cr *categoryRepository) DeleteCategory(category *model.Category) (string, error) {
	res := cr.db.Delete(&category)
	if res.Error != nil {
		return "", res.Error
	}

	return "delete success", nil
}
