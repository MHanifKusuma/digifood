import axios from "axios";
import Button from "components/shared-components/Button";
import { INewOrder } from "interfaces/Order";
import { IPaymentOptions } from "interfaces/Payment";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCarts } from "redux/actions/CartAction";
import { CartDispatch } from "redux/actions/CartAction/types";
import { RootState } from "redux/reducers";
import { formatCurrency } from "utils/index";
import CheckoutModalWrapper from "./style";

interface CheckoutModalProp {
  show: boolean;
  handleClose: () => void;
  paymentOptions: IPaymentOptions[];
}

const CheckoutModal = ({
  show,
  handleClose,
  paymentOptions,
}: CheckoutModalProp) => {
  const [cookies] = useCookies(["login"]);
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.CartsReducer
  );

  const { user } = useSelector((state: RootState) => state.UsersReducer);
  const cartDispatch: CartDispatch = useDispatch();

  const [couponDiscount, setCouponDiscount] = useState(0);
  const [selectedCouponId, setSelectedCouponId] = useState(0);
  const [selectedPaymentOptionId, setSelectedPaymentOptionId] = useState(1);

  const handleCouponChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value !== "0") {
      const values = e.currentTarget.value.split(",");
      setCouponDiscount(Number.parseInt(values[0]));
      setSelectedCouponId(Number.parseInt(values[1]));
    } else {
      setCouponDiscount(Number.parseInt(e.currentTarget.value));
      setSelectedCouponId(Number.parseInt(e.currentTarget.value));
    }
  };

  const handleChangePaymentOptions = (
    e: React.FormEvent<HTMLSelectElement>
  ) => {
    setSelectedPaymentOptionId(Number.parseInt(e.currentTarget.value));
  };

  const handleCheckout = () => {
    const newOrder: INewOrder = {
      coupon_id: selectedCouponId,
      payment_option_id: selectedPaymentOptionId,
      total_price: totalPrice - couponDiscount,
      order_detail: items,
    };

    axios
      .post("http://localhost:8080/orders", newOrder, {
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then((data) => {
        cartDispatch(resetCarts());
        navigate(`/orders/${data.data.data.OrderId}`);
      });
  };

  return (
    <CheckoutModalWrapper
      className={`modal fade ${show ? "show" : ""}`}
      ModalStyle={{ display: show ? "block" : "" }}
      id="staticBackdrop"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Checkout</h1>
          </div>
          <div className="modal-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <p>{item.menus.Name}</p>
                        {item.AddOns && (
                          <p className="add-ons">{item.AddOns}</p>
                        )}
                      </td>
                      <td className="text-center">{item.Quantity}</td>
                      <td className="text-end">
                        <p>Rp {formatCurrency(item.Price * item.Quantity)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="my-3">
              <p className="card-text mb-0 d-flex align-items-start">
                Total Price:&nbsp;
                {couponDiscount !== 0 && (
                  <span className="discounted-price fw-bolder">
                    Rp {formatCurrency(totalPrice - couponDiscount)}
                  </span>
                )}
                <span
                  className={`original-price fw-bolder ${
                    couponDiscount !== 0 && "strike"
                  }`}
                >
                  Rp {formatCurrency(totalPrice)}
                </span>
              </p>
              <div className="d-flex mt-3">
                <p>Use coupon:</p>
                <select
                  name="useCoupon"
                  id="useCoupon"
                  className="ms-3"
                  onChange={handleCouponChange}
                >
                  <option value="0">Not now</option>
                  {user.UserCoupon.map((coupon, index) => (
                    <option
                      value={
                        coupon.Coupon.DiscountAmount + "," + coupon.Coupon.Id
                      }
                      key={index}
                    >
                      {coupon.Coupon.Code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex mt-3">
                <p>Select Payment Method:</p>
                <select
                  name="useCoupon"
                  id="useCoupon"
                  className="ms-3"
                  onChange={handleChangePaymentOptions}
                >
                  {paymentOptions.map((option, index) => (
                    <option value={option.Id} key={index}>
                      {option.Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button
              btnStyle={{
                backgroundColor: "#E98E7D",
                color: "#FFFFFF",
                padding: "0.5rem 1.5rem",
              }}
              btnFunction={handleClose}
            >
              Cancel
            </Button>
            <Button
              btnStyle={{
                backgroundColor: "#579EFF",
                color: "#FFFFFF",
                padding: "0.5rem 1.5rem",
              }}
              btnFunction={handleCheckout}
            >
              Order
            </Button>
          </div>
        </div>
      </div>
    </CheckoutModalWrapper>
  );
};

export default CheckoutModal;
