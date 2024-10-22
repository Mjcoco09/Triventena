import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import sessionReducer from "./session";
import { cartReducer } from "./cart";
import { getProductsReducer, getProductDetailsReducer } from "./product";
import reviewReducer from "./review"
import wishlistReducer from "./wish"
import recentlyViewedReducer from "./recent"
const rootReducer = combineReducers({
  session: sessionReducer,
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  review:reviewReducer,
  wish: wishlistReducer,
  recent: recentlyViewedReducer
});

// const localCart = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : [];
//   const localWish = localStorage.getItem("wish")
//   ? JSON.parse(localStorage.getItem("wish"))
//   : [];
//   const INITIAL_STATE = {
//     cart: {
//       cartItems: localCart,
//     },
//     wish: {
//       wishItems: localWish,
//     },
//   };

const localCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const localWish = localStorage.getItem("wish")
  ? JSON.parse(localStorage.getItem("wish"))
  : [];
const localRecentlyViewed = localStorage.getItem("recentlyViewed")
  ? JSON.parse(localStorage.getItem("recentlyViewed"))
  : [];

// Combine initial states
const INITIAL_STATE = {
  cart: {
    cartItems: localCart,
  },
  wish: {
    wishItems: localWish,
  },
  recent: {
    recentlyViewedItems: localRecentlyViewed, // Add recently viewed initial state
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
