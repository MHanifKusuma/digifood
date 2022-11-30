import { combineReducers } from "redux";
import CartsReducer from "./CartsReducer";
import { UsersReducer } from "./UsersReducer";

const reducers = combineReducers({ CartsReducer, UsersReducer });
export type RootState = ReturnType<typeof reducers>;
export default reducers;
