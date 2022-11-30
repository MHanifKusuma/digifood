import axios from "axios";
import CartItemList from "components/page-components/CartComponent/CartItemList";
import CartSummary from "components/page-components/CartComponent/CartSummary";
import CheckoutModal from "components/page-components/CartComponent/CheckoutModal";
import Navbar from "components/shared-components/Navbar";
import { IPaymentOptions } from "interfaces/Payment";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import CartWrapper from "./style";

const Cart = () => {
  const [cookies] = useCookies(["login"]);
  const [paymentOptions, setPaymentOptions] = useState<IPaymentOptions[]>([]);

  const fetchPaymentOptions = () => {
    axios
      .get("http://localhost:8080/payment-options", {
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then((data) => setPaymentOptions(data.data.data));
  };

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  const [showCheckout, setShowCheckout] = useState(false);
  const handleCloseCheckoutModal = () => {
    setShowCheckout(false);
  };

  return (
    <CartWrapper>
      <Navbar />
      <CartItemList />
      <CartSummary setShowCheckoutModal={setShowCheckout} />
      <CheckoutModal
        handleClose={handleCloseCheckoutModal}
        show={showCheckout}
        paymentOptions={paymentOptions}
      />
    </CartWrapper>
  );
};

export default Cart;
