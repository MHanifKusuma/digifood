import axios from "axios";
import OrderDetailHeader from "components/page-components/OrderDetailComponent/OrderDetailHeader";
import OrderDetailList from "components/page-components/OrderDetailComponent/OrderDetailList";
import OrderDetailSummary from "components/page-components/OrderDetailComponent/OrderDetailSummary";
import Navbar from "components/shared-components/Navbar";
import { IOrder, IOrderDetail } from "interfaces/Order";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import OrderDetailWrapper, { OrderDetailContent } from "./style";

const OrderDetail = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["login"]);

  const date = new Date();
  const [order, setOrder] = useState<IOrder>({
    Id: 0,
    Coupon: {
      Id: 0,
      Coupon: {
        Id: 0,
        Code: "",
        DiscountAmount: 0,
        Available: false,
      },
      Amount: 0,
      Expired_at: date,
    },
    PaymentOption: {
      Id: 0,
      Name: "",
    },
    DeliveryStatus: {
      Id: 0,
      Status: "",
    },
    OrderDetail: [],
    TotalPrice: 0,
    CreatedAt: date,
  });

  const fetchOrderById = () => {
    axios
      .get(`http://localhost:8080/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then((data) => setOrder(data.data.data));
  };

  useEffect(() => {
    fetchOrderById();
  }, []);

  console.log(order);

  return (
    <OrderDetailWrapper>
      <Navbar />
      <div className="container py-5">
        <OrderDetailHeader
          orderId={order.Id}
          deliveryStatus={order.DeliveryStatus}
        />
        <OrderDetailContent className="py-5">
          <OrderDetailList orderDetailList={order.OrderDetail} />
          <OrderDetailSummary
            totalPrice={order.TotalPrice}
            paymentOption={order.PaymentOption}
            coupon={order.Coupon}
          />
        </OrderDetailContent>
      </div>
    </OrderDetailWrapper>
  );
};

export default OrderDetail;
