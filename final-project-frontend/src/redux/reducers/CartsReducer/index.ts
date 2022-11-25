import { ICart } from "interfaces/Cart";
import storage from "redux-persist/lib/storage";
import { CartsAction, CartsActionType } from "redux/actions/CartAction/types";

const initialCartState: ICart = {
  items: [],
  totalPrice: 0,
};

export default function (state = initialCartState, action: CartsAction): ICart {
  switch (action.type) {
    case CartsActionType.ADD_ITEMS:
      state.items.push(action.payload);
      return state;

    case CartsActionType.DELETE_ITEMS:
      return {
        ...state,
        items: state.items.filter(
          (cartItem) => cartItem.menus.Id !== action.payload
        ),
      };

    case CartsActionType.SET_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items.map((cartItem) => {
          if (cartItem.menus.Id === action.payload.menus.Id) {
            cartItem.quantity = action.payload.quantity;
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
