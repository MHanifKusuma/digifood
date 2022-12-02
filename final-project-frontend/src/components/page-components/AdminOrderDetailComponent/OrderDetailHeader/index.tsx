import Button from "components/shared-components/Button";
import { DeliveryStatusWrapper } from "components/shared-style";
import { IDeliveryStatus } from "interfaces/Delivery";
import React from "react";
import OrderDetailHeaderWrapper from "./style";

interface OrderDetailHeaderProp {
  orderId: number;
  user: string;
  deliveryStatus: IDeliveryStatus;
}

const OrderDetailHeader = ({
  orderId,
  user,
  deliveryStatus,
}: OrderDetailHeaderProp) => {
  const deliveryStatusClass = deliveryStatus.Status.toLowerCase().replaceAll(
    " ",
    "-"
  );

  return (
    <OrderDetailHeaderWrapper>
      <div className="row">
        <div className="col-12 col-lg d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <h1 className="text-center text-lg-start">
            Order#{orderId}: {user}
          </h1>
          <div>
            <DeliveryStatusWrapper
              className={`delivery-${deliveryStatusClass} ms-lg-3`}
            >
              {deliveryStatus.Status}
            </DeliveryStatusWrapper>
          </div>
        </div>
      </div>
    </OrderDetailHeaderWrapper>
  );
};

export default OrderDetailHeader;
