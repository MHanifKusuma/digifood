import axios from "axios";
import { IOrder, IUpdateOrderDeliveryStatus } from "interfaces/Order";
import { IUser, IUserState } from "interfaces/User";
import { Dispatch } from "react";
import { OrderAction, OrderActionType } from "./type";

export const SetOrder = (payload: IOrder): OrderAction => {
  return {
    type: OrderActionType.SET_ORDER,
    payload,
  };
};

export const SetOrderLoading = (payload: boolean): OrderAction => {
  return {
    type: OrderActionType.SET_LOADING,
    payload,
  };
};

export const SetOrderError = (payload: string | null): OrderAction => {
  return {
    type: OrderActionType.SET_ERROR,
    payload,
  };
};

export const fetchOrder = (token: string, orderId: string) => {
  return (dispatch: Dispatch<OrderAction>): void => {
    dispatch(SetOrderLoading(true));
    dispatch(SetOrderError(null));

    axios
      .get(`http://localhost:8080/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => dispatch(SetOrder(data.data.data)))
      .catch((error) => SetOrderError(error))
      .finally(() => dispatch(SetOrderLoading(false)));
  };
};

export const updateOrderIsPaid = (token: string, orderId: number) => {
  const payload: IUpdateOrderDeliveryStatus = {
    OrderId: orderId,
    DeliveryId: 2,
  };

  return (): void => {
    axios
      .post(`http://localhost:8080/orders-delivery-status`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => fetchOrder(token, String(orderId)));
  };
};
