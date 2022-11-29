package service

import (
	"final-project-backend/model"
	"final-project-backend/pkg/utils"
	"final-project-backend/repository"
	"net/http"
)

type couponService struct {
	repository repository.CouponRepository
}

type CouponService interface {
	GetUserCoupon(userId int, pageable utils.Pageable) (*utils.Page, int, error)
	GetUserCouponWithoutPagination(userId int) ([]*model.UserCoupon, int, error)
	CheckUserCoupon(userId, couponId int) (int, error)
}

func NewCouponService(repository repository.CouponRepository) CouponService {
	return &couponService{
		repository: repository,
	}
}

func (cs *couponService) GetUserCoupon(userId int, pageable utils.Pageable) (*utils.Page, int, error) {
	data, dataError := cs.repository.GetUserCoupon(userId, pageable)
	if dataError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return data, http.StatusOK, nil
}

func (cs *couponService) GetUserCouponWithoutPagination(userId int) ([]*model.UserCoupon, int, error) {
	coupons, couponError := cs.repository.GetUserCouponWithoutPagination(userId)
	if couponError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return coupons, http.StatusOK, nil
}

func (cs *couponService) CheckUserCoupon(userId, couponId int) (int, error) {
	couponData, status, couponError := cs.GetUserCouponWithoutPagination(userId)
	if couponError != nil {
		return status, utils.ErrNotExpected
	}

	foundCoupon := false
	for _, coupon := range couponData {
		if coupon.CouponId == couponId && coupon.Amount > 0 {
			foundCoupon = true
			break
		}
	}
	if !foundCoupon {
		return http.StatusNotFound, utils.ErrCouponNotFound
	}

	return http.StatusOK, nil
}
