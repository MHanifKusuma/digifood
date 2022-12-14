import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { formatCurrency } from "utils/index";
import UserCouponWrapper, { CouponWrapper } from "./style";

const UserCoupon = () => {
  const { user } = useSelector((state: RootState) => state.UsersReducer);

  return (
    <div className="mt-5 mt-lg-0">
      <h5 className="text-center">
        {user.UserCoupon.length > 0 ? "Your Coupons": "You don't have any coupon"}
      </h5>

      <UserCouponWrapper>
        {user.UserCoupon.map((coupon) => (
          <CouponWrapper className="col p-3" key={coupon.Id}>
            <p className="fw-bolder d-flex justify-content-between align-items-center">
              {coupon.Coupon.Code}{" "}
              <span className="fw-normal fs-4">x{coupon.Amount}</span>
            </p>
            <p className="expired-text">
              Expired at: {moment(coupon.Expired_at).format("D MMMM YYYY")}
            </p>
            <p>Discount: Rp {formatCurrency(coupon.Coupon.DiscountAmount)}</p>
          </CouponWrapper>
        ))}
      </UserCouponWrapper>
    </div>
  );
};

export default UserCoupon;
