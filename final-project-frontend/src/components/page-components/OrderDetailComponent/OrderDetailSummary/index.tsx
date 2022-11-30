import Button from "components/shared-components/Button";
import { DiscountedPrice } from "components/shared-style";
import { ICoupon, IUserCoupons } from "interfaces/Coupon";
import { IPaymentOptions } from "interfaces/Payment";
import React from "react";
import OrderDetailSummaryWrapper from "./style";

interface OrderDetailSummaryProp {
  totalPrice: number;
  paymentOption: IPaymentOptions;
  coupon: IUserCoupons;
}

const OrderDetailSummary = ({
  totalPrice,
  paymentOption,
  coupon,
}: OrderDetailSummaryProp) => {
  return (
    <div className="mb-5 mb-lg-0">
      <OrderDetailSummaryWrapper>
        <h4 className="mb-4">Order Summary</h4>
        <p className="mb-0">Total price:</p>
        <DiscountedPrice>
          {coupon.Id !== 0 && (
            <span className="discounted-price fw-bolder">
              Rp {totalPrice - coupon.Coupon.DiscountAmount}
            </span>
          )}
          <span
            className={`original-price fw-bolder ${
              coupon.Id !== 0 && "strike"
            }`}
          >
            Rp {totalPrice}
          </span>
        </DiscountedPrice>
        <p className="mb-0">Coupon code:</p>
        <p>{coupon.Coupon.Code}</p>
        <p className="mb-0">Payment with:</p>
        <p>{paymentOption.Name}</p>
        <Button
          btnStyle={{
            backgroundColor: "#579EFF",
            color: "#FFFFFF",
            padding: "0.5rem 3rem",
            margin: "auto 0",
          }}
        >
          Pay
        </Button>
      </OrderDetailSummaryWrapper>
    </div>
  );
};

export default OrderDetailSummary;
