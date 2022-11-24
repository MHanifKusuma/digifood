package repository

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type menuRepository struct {
	db *gorm.DB
}

type MenuRepository interface {
	GetAllMenu(pageable utils.Pageable) (*utils.Page, error)
	GetAllMenuByCategory() ([]*model.Category, error)
	GetMenuById(id int) (*model.Menu, error)
}

func NewMenuRepository(db *gorm.DB) MenuRepository {
	return &menuRepository{
		db: db,
	}
}

func (mr *menuRepository) GetAllMenu(pageable utils.Pageable) (*utils.Page, error) {
	var count int64
	var countError error

	arguments := []interface{}{
		pageable.SearchParams()[utils.SEARCH_BY_MENU_NAME],
		pageable.FilterParams()[utils.FILTER_BY_CATEGORY],
	}

	if arguments[1] != nil && arguments[1] != "0" {
		countError = mr.db.
			Model(&model.Menu{}).
			Where("name ILIKE ?", arguments[0]).
			Where("category_id = ?", arguments[1]).
			Count(&count).Error
	} else {
		countError = mr.db.
			Model(&model.Menu{}).
			Where("name ILIKE ?", arguments[0]).
			Count(&count).Error
	}

	if countError != nil {
		return utils.NewPaginator(pageable.GetPage(), pageable.GetLimit(), 0).Pageable(model.Menu{}), nil
	}

	if count == 0 {
		return utils.NewPaginator(pageable.GetPage(), pageable.GetLimit(), 0).Pageable(model.Menu{}), nil
	}

	paginator := utils.NewPaginator(pageable.GetPage(), pageable.GetLimit(), int(count))
	arguments = append(arguments, pageable.SortBy(), paginator.PerPageNums, paginator.Offset())

	var menus []model.Menu
	var findError error

	if arguments[1] != nil && arguments[1] != "0" {
		findError = mr.db.Preload(clause.Associations).
			Where("name ILIKE ?", arguments[0]).
			Where("category_id = ?", arguments[1]).
			Order(arguments[2]).
			Limit(arguments[3].(int)).
			Offset(arguments[4].(int)).
			Find(&menus).Error
	} else {
		findError = mr.db.Preload(clause.Associations).
			Where("name ILIKE ?", arguments[0]).
			Order(arguments[2]).
			Limit(arguments[3].(int)).
			Offset(arguments[4].(int)).
			Find(&menus).Error
	}

	return paginator.Pageable(menus), findError
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

	res := mr.db.Model(&model.Menu{}).Preload(clause.Associations).First(&menu, id)
	if res.Error != nil {
		return nil, res.Error
	}

	return menu, nil
}
