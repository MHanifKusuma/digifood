import Button from "components/shared-components/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartDispatch } from "redux/actions/CartAction/types";
import { RootState } from "redux/reducers";
import CheckoutModal from "../CheckoutModal";
import CartSummaryWrapper, { SummaryWrapper } from "./style";

const CartSummary = () => {
  const navigate = useNavigate();

  const cartsDispatch: CartDispatch = useDispatch();
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.CartsReducer
  );
  const isCartEmpty: boolean = items.length < 1;

  const [showCheckout, setShowCheckout] = useState(false);

  const handleCloseCheckoutModal = () => {
    setShowCheckout(false);
  };

  if (isCartEmpty) return <></>;

  return (
    <CartSummaryWrapper className="container py-2 px-2 px-lg-5">
      <SummaryWrapper>
        <div className="summary">
          <h4>Summary</h4>
          <p>
            Total: <span>Rp {totalPrice}</span>{" "}
          </p>
        </div>
        <div className="coupon mt-3 mt-lg-0">Add Coupon:</div>
      </SummaryWrapper>
      <div className="buttons d-flex justify-content-center">
        <Button
          btnStyle={{
            padding: "0.25rem 0.75rem",
            backgroundColor: "#AAD4B3",
            color: "#FFFFFF",
          }}
          btnClass="mx-2 mt-3"
          btnFunction={() => navigate("/menus")}
        >
          Add more
        </Button>
        <Button
          btnStyle={{
            padding: "0.25rem 0.75rem",
            backgroundColor: "#579EFF",
            color: "#FFFFFF",
          }}
          btnClass="mx-2 mt-3"
          btnFunction={() => setShowCheckout(true)}
        >
          Order
        </Button>
      </div>

      <CheckoutModal
        show={showCheckout}
        handleClose={handleCloseCheckoutModal}
      />
    </CartSummaryWrapper>
  );
};

export default CartSummary;
