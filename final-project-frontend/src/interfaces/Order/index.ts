import { ICart, ICartItem } from "interfaces/Cart";
import { IUserCoupons } from "interfaces/Coupon";
import { IDeliveryStatus } from "interfaces/Delivery";
import { IMenu } from "interfaces/Menu";
import { IPaymentOptions } from "interfaces/Payment";

export interface IOrder {
  Id: number;
  Coupon: IUserCoupons;
  PaymentOption: IPaymentOptions;
  DeliveryStatus: IDeliveryStatus;
  OrderDetail: IOrderDetail[];
  TotalPrice: number;
  CreatedAt: Date;
}

export interface IOrderDetail {
  Id: number;
  OrderId: number;
  Menu: IMenu;
  Price: number;
  Quantity: number;
  AddOns: string;
}

export interface INewOrder {
  coupon_id: number;
  payment_option_id: number;
  total_price: number;
  order_detail: ICartItem[];
}

export interface IUpdateOrderDeliveryStatus {
  OrderId: number;
  DeliveryId: number;
}

export interface IOrderState {
  data: IOrder;
  orderLoading: boolean;
  orderError: string | null;
}
