import { combineReducers } from "redux";
import CartsReducer from "./CartsReducer";
import { OrdersReducer } from "./OrdersReducer";
import { UsersReducer } from "./UsersReducer";

const reducers = combineReducers({ CartsReducer, UsersReducer, OrdersReducer });
export type RootState = ReturnType<typeof reducers>;
export default reducers;
