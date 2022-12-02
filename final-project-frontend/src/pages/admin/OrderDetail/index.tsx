import OrderDetailHeader from "components/page-components/AdminOrderDetailComponent/OrderDetailHeader";
import OrderDetailList from "components/page-components/AdminOrderDetailComponent/OrderDetailList";
import OrderDetailSummary from "components/page-components/AdminOrderDetailComponent/OrderDetailSummary";
import Navbar from "components/shared-components/AdminNavbar";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrder } from "redux/actions/OrderAction";
import { OrderDispatch } from "redux/actions/OrderAction/type";
import { RootState } from "redux/reducers";
import OrderDetailWrapper, { OrderDetailContent } from "./style";

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["login"]);

  const orderDispatch: OrderDispatch = useDispatch();

  const fetchOrderCallback = () => {
    orderDispatch(fetchOrder(cookies.login, id ? id : ""));
  };

  useEffect(() => {
    fetchOrderCallback();
  }, [orderDispatch]);

  const { data } = useSelector((state: RootState) => state.OrdersReducer);
  return (
    <OrderDetailWrapper>
      <Navbar />
      <div className="container py-5">
        <OrderDetailHeader
          orderId={data.Id}
          user={data.User.Email}
          deliveryStatus={data.DeliveryStatus}
        />
        <OrderDetailContent className="py-5">
          <OrderDetailList orderDetailList={data.OrderDetail} />
          <OrderDetailSummary
            totalPrice={data.TotalPrice}
            paymentOption={data.PaymentOption}
            coupon={data.Coupon}
            orderId={data.Id}
            deliveryStatusId={data.DeliveryStatus.Id}
          />
        </OrderDetailContent>
      </div>
    </OrderDetailWrapper>
  );
};

export default AdminOrderDetail;
