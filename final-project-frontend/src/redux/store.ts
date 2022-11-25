import { legacy_createStore as createStore } from "redux";
import reducers from "./reducers";
import applyMiddleware from "./middlewares";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "cart",
  storage,
  whiteList: ["CartsReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, applyMiddleware);
export const persistor = persistStore(store);
