import Button from "components/shared-components/Button";
import { IOrder } from "interfaces/Order";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "utils/index";
import OrderCardWrapper from "./style";

interface OrderCardProp {
  order: IOrder;
}

const OrderCard = ({ order }: OrderCardProp) => {
  const navigate = useNavigate();
  const deliveryStatusClass =
    order.DeliveryStatus.Status.toLowerCase().replaceAll(" ", "-");
  return (
    <OrderCardWrapper className="mb-3 p-5">
      <div className="row mb-3 mb-lg-0">
        <p className="fw-bolder mb-2 text-center text-lg-start">
          Order: {order.User.Email}
        </p>
        <p className="mb-0 text-center text-lg-start">
          {`${moment(order.CreatedAt).format("D MMM YYYY HH:MM:SS")}`}
        </p>
        <p>{`${order.CreatedAt}`}</p>
      </div>
      <div className="row">
        <div className="col-12 col-lg-4 align-center align-lg-start mb-3 mb-lg-0">
          <p className="card-text mb-0 d-flex flex-column flex-lg-row">
            Total price:&nbsp;
            <div className="d-flex align-items-start">
              {order.Coupon.Id != 0 && (
                <span className="discounted-price">
                  Rp&nbsp;
                  {formatCurrency(
                    order.TotalPrice - order.Coupon.Coupon.DiscountAmount
                  )}
                </span>
              )}
              <span
                className={`original-price ${order.Coupon.Id != 0 && "strike"}`}
              >
                Rp {formatCurrency(order.TotalPrice)}
              </span>
            </div>
          </p>
        </div>
        <div className="col-12 col-lg-3 align-center mb-3 mb-lg-0">
          <span className={`delivery delivery-${deliveryStatusClass}`}>
            {order.DeliveryStatus.Status}
          </span>
        </div>
        <div className="col-12 col-lg align-center mb-3 mb-lg-0">
          <div>
            <p className="mb-0 paid-with">Payment with:</p>
            <p className="mb-0">{order.PaymentOption.Name}</p>
          </div>
        </div>
        <div className="col-12 col-lg align-center">
          <Button
            btnStyle={{
              color: "#FFFFFF",
              backgroundColor: "#579EFF",
              width: "100%",
            }}
            btnFunction={() => navigate(`/orders/${order.Id}`)}
          >
            Detail
          </Button>
        </div>
      </div>
    </OrderCardWrapper>
  );
};

export default OrderCard;
