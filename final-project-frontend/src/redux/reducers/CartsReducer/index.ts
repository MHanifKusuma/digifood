import { ICart } from "interfaces/Cart";
import { CartsAction, CartsActionType } from "redux/actions/CartAction/types";

const initialCartState: ICart = {
  items: [],
  totalPrice: 0,
};

export default function (state = initialCartState, action: CartsAction): ICart {
  switch (action.type) {
    case CartsActionType.ADD_ITEMS:
      let sameItem = false;
      const items = state.items.map((item) => {
        if (
          item.menus.Name === action.payload.menus.Name &&
          item.option === action.payload.option
        ) {
          sameItem = true;

          item.quantity += action.payload.quantity;
          item.price += action.payload.price;
          return item;
        } else {
          return item;
        }
      });

      if (sameItem) {
        return {
          ...state,
          items: items,
        };
      } else {
        state.items.push(action.payload);
      }

      return state;
    case CartsActionType.DELETE_ITEMS:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };

    case CartsActionType.SET_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map((cartItem) => {
          if (
            cartItem.menus.Id === action.payload.menus.Id &&
            cartItem.option === action.payload.option
          ) {
            cartItem.quantity = action.payload.quantity;
            cartItem.price = action.payload.price;
          }

          return cartItem;
        }),
      };

    case CartsActionType.SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload,
      };

    case CartsActionType.RESET_CART:
      return {
        ...state,
        items: [],
        totalPrice: 0,
      };

    default:
      return state;
  }
}
