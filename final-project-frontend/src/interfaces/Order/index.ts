import { ICart, ICartItem } from "interfaces/Cart";
import { IUserCoupons } from "interfaces/Coupon";
import { IDeliveryStatus } from "interfaces/Delivery";
import { IMenu } from "interfaces/Menu";
import { IPaymentOptions } from "interfaces/Payment";
import { IUserInfo } from "interfaces/User";

export interface IOrder {
  Id: number;
  Coupon: IUserCoupons;
  User: IUserInfo;
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

export interface IOrderPagination {
  data: IOrder[];
  current_page: number;
  total: number;
  total_page: number;
}
