import { ICart, ICartItem } from "interfaces/Cart";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export enum CartsActionType {
  ADD_ITEMS = "ADD_ITEMS",
  DELETE_ITEMS = "DELETE_ITEMS",
  SET_ITEM_QUANTITY = "SET_ITEM_QUANTITY",
  SET_TOTAL_PRICE = "SET_TOTAL_PRICE",
  RESET_CART = "RESET_CART",
}

export interface IaddCartItems {
  type: CartsActionType.ADD_ITEMS;
  payload: ICartItem;
}

export interface IdeleteCartItems {
  type: CartsActionType.DELETE_ITEMS;
  payload: number;
}

export interface IsetCartItemQuantity {
  type: CartsActionType.SET_ITEM_QUANTITY;
  payload: ICartItem;
}

export interface IsetCartTotalPrice {
  type: CartsActionType.SET_TOTAL_PRICE;
  payload: number;
}

export interface IresetCart {
  type: CartsActionType.RESET_CART;
}

export type CartsAction =
  | IaddCartItems
  | IdeleteCartItems
  | IsetCartItemQuantity
  | IsetCartTotalPrice
  | IresetCart;

export type CartDispatch = ThunkDispatch<ICart, any, AnyAction>;
