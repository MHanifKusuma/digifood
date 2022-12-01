import { IOrder, IUpdateOrderDeliveryStatus } from "interfaces/Order";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export enum OrderActionType {
  SET_ORDER = "SET_ORDER",
  UPDATE_ORDER_DELIVERY_STATUS = "UPDATE_ORDER_DELIVERY_STATUS",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

export interface SetOrder {
  type: OrderActionType.SET_ORDER;
  payload: IOrder;
}

export interface SetOrderLoading {
  type: OrderActionType.SET_LOADING;
  payload: boolean;
}

export interface SetOrderError {
  type: OrderActionType.SET_ERROR;
  payload: string | null;
}

export type OrderAction = SetOrder | SetOrderLoading | SetOrderError;

export type OrderDispatch = ThunkDispatch<IOrder, any, AnyAction>;
