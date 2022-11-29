package repository

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type couponRepository struct {
	db *gorm.DB
}

type CouponRepository interface {
	GetUserCoupon(userId int, pageable utils.Pageable) (*utils.Page, error)
	GetUserCouponWithoutPagination(userId int) ([]*model.UserCoupon, error)
}

func NewCouponRepository(db *gorm.DB) CouponRepository {
	return &couponRepository{
		db: db,
	}
}

func (cr *couponRepository) GetUserCoupon(userId int, pageable utils.Pageable) (*utils.Page, error) {
	var count int64
	var countError error

	arguments := []interface{}{
		pageable.SearchParams()[utils.SEARCH_BY_MENU_NAME],
		pageable.FilterParams()[utils.FILTER_BY_CATEGORY],
	}

	countError = cr.db.
		Model(&model.UserCoupon{}).
		Where("user_id = ?", userId).
		Count(&count).Error

	if countError != nil {
		return utils.NewPaginator(pageable.GetPage(), pageable.GetLimit(), 0).Pageable(model.Menu{}), nil
	}

	if count == 0 {
		return utils.NewPaginator(pageable.GetPage(), pageable.GetLimit(), 0).Pageable(model.Menu{}), nil
	}

	paginator := utils.NewPaginator(pageable.GetPage(), pageable.GetLimit(), int(count))
	arguments = append(arguments, pageable.SortBy(), paginator.PerPageNums, paginator.Offset())

	var userCoupons []model.UserCoupon

	findError := cr.db.Preload(clause.Associations).
		Where("user_id = ?", userId).
		Order(arguments[2]).
		Limit(arguments[3].(int)).
		Offset(arguments[4].(int)).
		Find(&userCoupons).Error

	return paginator.Pageable(userCoupons), findError
}

func (cr *couponRepository) GetUserCouponWithoutPagination(userId int) ([]*model.UserCoupon, error) {
	var userCoupons []*model.UserCoupon

	coupons := cr.db.Where("user_id = ?", userId).Find(&userCoupons)
	if coupons.Error != nil {
		return nil, coupons.Error
	}

	return userCoupons, nil
}
