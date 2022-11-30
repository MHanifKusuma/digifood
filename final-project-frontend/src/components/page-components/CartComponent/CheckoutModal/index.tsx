import Button from "components/shared-components/Button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import CheckoutModalWrapper from "./style";

interface CheckoutModalProp {
  show: boolean;
  handleClose: () => void;
}

const CheckoutModal = ({ show, handleClose }: CheckoutModalProp) => {
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.CartsReducer
  );
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
                  <th>Item</th>
                  <th className="text-center">Qty</th>
                  <th className="text-center">Price</th>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr>
                      <td>{item.menus.Name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">
                        <p>{item.price}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="fw-bolder">Total price: Rp{totalPrice}</p>
            <div className="d-flex mt-3">
              <p>Use coupon:</p>
              <select name="useCoupon" id="useCoupon" className="ms-3">
                <option value="">coupon1</option>
                <option value="">coupon2</option>
                <option value="">coupon3</option>
                <option value="">coupon4</option>
              </select>
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
