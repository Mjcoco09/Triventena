import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import sessionReducer from "./session";
import { cartReducer } from "./cart";
import { getProductsReducer, getProductDetailsReducer } from "./product";
import reviewReducer from "./review"
import wishlistReducer from "./wish"
const rootReducer = combineReducers({
  session: sessionReducer,
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  review:reviewReducer,
  wish: wishlistReducer,
});

const localCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
  const localWish = localStorage.getItem("wish")
  ? JSON.parse(localStorage.getItem("wish"))
  : [];
  const INITIAL_STATE = {
    cart: {
      cartItems: localCart,
    },
    wish: {
      wishItems: localWish,
    },
  };

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = INITIAL_STATE) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
