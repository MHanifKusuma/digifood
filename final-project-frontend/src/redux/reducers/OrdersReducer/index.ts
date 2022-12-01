import { IOrder, IOrderState } from "interfaces/Order";
import { OrderAction, OrderActionType } from "redux/actions/OrderAction/type";

const date = new Date();
const initialOrderState: IOrderState = {
  data: {
    Id: 0,
    Coupon: {
      Id: 0,
      Coupon: {
        Id: 0,
        Code: "",
        DiscountAmount: 0,
        Available: false,
      },
      Amount: 0,
      Expired_at: date,
    },
    PaymentOption: {
      Id: 0,
      Name: "",
    },
    DeliveryStatus: {
      Id: 0,
      Status: "",
    },
    OrderDetail: [],
    TotalPrice: 0,
    CreatedAt: date,
  },
  isLoading: false,
  isError: null,
};

export function OrdersReducer(
  state = initialOrderState,
  action: OrderAction
): IOrderState {
  switch (action.type) {
    case OrderActionType.SET_ORDER:
      return {
        ...state,
        data: action.payload,
      };

    case OrderActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case OrderActionType.SET_ERROR:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
}
