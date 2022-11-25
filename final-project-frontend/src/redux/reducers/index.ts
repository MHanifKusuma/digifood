import { combineReducers } from "redux";
import CartsReducer from "./CartsReducer";

const reducers = combineReducers({ CartsReducer });
export type RootState = ReturnType<typeof reducers>;
export default reducers;
