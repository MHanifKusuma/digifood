import Button from "components/shared-components/Button";
import { format } from "path";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers";
import { formatCurrency } from "utils/index";
import CartSummaryWrapper, { SummaryWrapper } from "./style";

interface CartSummaryProp {
  setShowCheckoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartSummary = ({ setShowCheckoutModal }: CartSummaryProp) => {
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.CartsReducer
  );
  const isCartEmpty: boolean = items.length < 1;

  if (isCartEmpty) return <></>;

  return (
    <CartSummaryWrapper className="container py-2 px-2 px-lg-5">
      <SummaryWrapper>
        <div className="summary">
          <h4>Summary</h4>
          <p>
            Total: <span>Rp {formatCurrency(totalPrice)}</span>{" "}
          </p>
        </div>
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
          btnFunction={() => setShowCheckoutModal(true)}
        >
          Order
        </Button>
      </div>
    </CartSummaryWrapper>
  );
};

export default CartSummary;
