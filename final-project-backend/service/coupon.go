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
	GetAllCoupon(pageable utils.Pageable, userRole int) (*utils.Page, int, error)
	GetCouponById(id int) (*model.Coupon, int, error)
	UpdateCoupon(coupon model.Coupon, userRole int) (*model.Coupon, int, error)
	DeleteCoupon(id int, userRole int) (int, int, error)
	CreateCoupon(coupon model.Coupon, userRole int) (*model.Coupon, int, error)
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

func (cs *couponService) GetAllCoupon(pageable utils.Pageable, userRole int) (*utils.Page, int, error) {
	if userRole != 0 {
		return nil, http.StatusUnauthorized, utils.ErrPageRestricted
	}

	coupons, couponsError := cs.repository.GetAllCoupon(pageable)
	if couponsError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return coupons, http.StatusOK, nil
}

func (cs *couponService) GetCouponById(couponId int) (*model.Coupon, int, error) {
	coupon, couponError := cs.repository.GetCouponById(couponId)
	if couponError != nil {
		return nil, http.StatusNotFound, utils.ErrCouponNotFound
	}

	return coupon, http.StatusOK, nil
}

func (cs *couponService) UpdateCoupon(coupon model.Coupon, userRole int) (*model.Coupon, int, error) {
	if userRole != 0 {
		return nil, http.StatusUnauthorized, utils.ErrPageRestricted
	}

	_, status, getCouponError := cs.GetCouponById(coupon.Id)
	if status != 200 {
		return nil, status, getCouponError
	}

	updateCoupon, updateError := cs.repository.UpdateCoupon(coupon)
	if updateError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return updateCoupon, http.StatusOK, nil
}

func(cs *couponService) CreateCoupon(coupon model.Coupon, userRole int) (*model.Coupon, int, error) {
	if userRole != 0 {
		return nil, http.StatusUnauthorized, utils.ErrPageRestricted
	}

	createdCoupon, updateError := cs.repository.CreateCoupon(coupon)
	if updateError != nil {
		return nil, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return createdCoupon, http.StatusOK, nil
}

func (cs *couponService) DeleteCoupon(id int, userRole int) (int, int, error) {
	if userRole != 0 {
		return -1, http.StatusUnauthorized, utils.ErrPageRestricted
	}

	_, status, getCouponError := cs.GetCouponById(id)
	if status != 200 {
		return -1, status, getCouponError
	}

	deletedCoupon, deleteError := cs.repository.DeleteCoupon(id)
	if deleteError != nil {
		return -1, http.StatusInternalServerError, utils.ErrNotExpected
	}

	return deletedCoupon, http.StatusOK, nil
}