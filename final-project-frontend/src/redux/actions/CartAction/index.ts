import { ICartItem } from "interfaces/Cart";
import { CartsAction, CartsActionType } from "./types";

export const addCartsitem = (payload: ICartItem): CartsAction => {
  return {
    type: CartsActionType.ADD_ITEMS,
    payload,
  };
};

export const deleteCartsItem = (payload: number): CartsAction => {
  return {
    type: CartsActionType.DELETE_ITEMS,
    payload,
  };
};

export const setCartItemsQuantity = (payload: ICartItem): CartsAction => {
  return {
    type: CartsActionType.SET_ITEM_QUANTITY,
    payload,
  };
};

export const setCartsTotalPrice = (payload: number): CartsAction => {
  return {
    type: CartsActionType.SET_TOTAL_PRICE,
    payload,
  };
};

export const resetCarts = (): CartsAction => {
  return {
    type: CartsActionType.RESET_CART,
  };
};
