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
          item.AddOns === action.payload.AddOns
        ) {
          sameItem = true;

          item.Quantity += action.payload.Quantity;
          item.Price += action.payload.Price;
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
            cartItem.AddOns === action.payload.AddOns
          ) {
            cartItem.Quantity = action.payload.Quantity;
            cartItem.Price = action.payload.Price;
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
