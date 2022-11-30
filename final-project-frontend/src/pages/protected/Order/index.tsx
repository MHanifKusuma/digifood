import axios from "axios";
import OrderList from "components/page-components/OrderComponent/OrderList";
import Navbar from "components/shared-components/Navbar";
import { IOrder } from "interfaces/Order";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import OrderWrapper from "./style";

const Order = () => {
  const [cookies] = useCookies(["login"]);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const fetchUserOrders = () => {
    axios
      .get("http://localhost:8080/orders", {
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then((data) => setOrders(data.data.data.data));
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <OrderWrapper>
      <Navbar />
      <div className="container py-5">
        <h1>Order History</h1>
        <OrderList orders={orders} />
      </div>
    </OrderWrapper>
  );
};

export default Order;
