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
	CreateMenu(menu model.Menu) (*model.Menu, error)
	UpdateMenu(menu model.Menu) (*model.Menu, error)
	DeleteMenuOptions(optionIds []int) (string, error)
	DeleteMenu(menuId int) (int, error)
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

func (mr *menuRepository) CreateMenu(menu model.Menu) (*model.Menu, error) {
	if len(menu.MenuOptions) != 0 {
		for _, option := range menu.MenuOptions {
			newMenuOption := model.MenuOption{
				MenuId: menu.Id,
				Name:   option.Name,
				Price:  option.Price,
				Type:   option.Type,
			}

			createOptionRes := mr.db.Create(&newMenuOption)
			if createOptionRes.Error != nil {
				return nil, createOptionRes.Error
			}
		}
	}

	updateMenuRes := mr.db.
		Omit("AverageRating", "TotalFavorites", "TotalReview", "Promotion").
		Create(&menu)
	if updateMenuRes.Error != nil {
		return nil, updateMenuRes.Error
	}

	return &menu, nil
}

func (mr *menuRepository) UpdateMenu(menu model.Menu) (*model.Menu, error) {
	if len(menu.MenuOptions) != 0 {
		for _, option := range menu.MenuOptions {
			if option.Id != 0 {
				updateOptionRes := mr.db.Save(&option)
				if updateOptionRes.Error != nil {
					return nil, updateOptionRes.Error
				}
			} else {
				newMenuOption := model.MenuOption{
					MenuId: menu.Id,
					Name:   option.Name,
					Price:  option.Price,
					Type:   option.Type,
				}

				createOptionRes := mr.db.Create(&newMenuOption)
				if createOptionRes.Error != nil {
					return nil, createOptionRes.Error
				}
			}
		}
	}

	updateMenuRes := mr.db.
		Clauses(clause.Returning{}).
		Model(&menu).
		Select("menus.name", "menus.category_id", "menus.price", "menus.description", "menus.menu_photo").
		Updates(menu)
	if updateMenuRes.Error != nil {
		return nil, updateMenuRes.Error
	}

	return &menu, nil
}

func (mr *menuRepository) DeleteMenuOptions(optionIds []int) (string, error) {
	deleteRes := mr.db.Delete(&model.MenuOption{}, optionIds)
	if deleteRes.Error != nil {
		return "", deleteRes.Error
	}

	return "success", deleteRes.Error
}

func (mr *menuRepository) DeleteMenu(menuId int) (int, error) {
	deleteRes := mr.db.Delete(&model.Menu{}, menuId)
	if deleteRes.Error != nil {
		return -1, deleteRes.Error
	}

	return menuId, nil
}
