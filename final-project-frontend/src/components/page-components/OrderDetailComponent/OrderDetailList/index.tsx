import Button from "components/shared-components/Button";
import { IOrderDetail } from "interfaces/Order";
import React from "react";
import OrderDetailListWrapper, { OrderDetailMenu } from "./style";

interface OrderDetailListProp {
  orderDetailList: IOrderDetail[];
}

const OrderDetailList = ({ orderDetailList }: OrderDetailListProp) => {
  return (
    <OrderDetailListWrapper>
      <OrderDetailMenu>
        {orderDetailList.map((orderDetail) => (
          <div className="row mb-3">
            <div className="col-12 col-lg-3 p-auto my-auto">
              <img src={orderDetail.Menu.MenuPhoto} alt="menu photo" />
            </div>
            <div className="col d-flex flex-wrap mt-4 mt-lg-0">
              <div className="col">
                <p className="fw-bolder mb-1">{orderDetail.Menu.Name}</p>
                <p>Rp {orderDetail.Price}</p>
                <p>Add-ons: {orderDetail.AddOns || "none"}</p>
              </div>
              <div className="col d-flex align-items-center justify-content-between">
                <div>Rp {orderDetail.Price * orderDetail.Quantity}</div>
              </div>
            </div>
          </div>
        ))}
      </OrderDetailMenu>
    </OrderDetailListWrapper>
  );
};

export default OrderDetailList;
