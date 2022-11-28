import CartItemList from "components/page-components/CartComponent/CartItemList";
import CartSummary from "components/page-components/CartComponent/CartSummary";
import Navbar from "components/shared-components/Navbar";
import React from "react";
import CartWrapper from "./style";

const Cart = () => {
  return (
    <CartWrapper>
      <Navbar />
      <CartItemList />
      <CartSummary />
    </CartWrapper>
  );
};

export default Cart;
