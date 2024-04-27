import { csrfFetch } from "./csrf";
export const ADD_CART = "ADD_TO_CART";
export const DELETE_CART = "Delete_Cart";
export const RESET_CART = "RESET_CART";

export const resetCart = () => ({
  type: RESET_CART,
});

const addToCartAction = (payload) => ({
  type: ADD_CART,
  payload,
});

export const addCartThunk = (id, qty) => async (dispatch, getState) => {
  const res = await csrfFetch(`/api/products/${id}`);
  if (!res.ok) {
    const error = await res.json();
    console.error("Error fetching product:", error);
    return;
  }
  const data = await res.json();
  const cartItem = {
    product: data.id,
    name: data.name,
    imageUrl: data.imageUrl,
    price: data.price,
    count: data.count,
    qty,
  };

  dispatch(addToCartAction(cartItem));

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeCart = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch(resetCart());
  localStorage.removeItem("cart");
};

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_CART: {
      const item = action.payload;

      const exists = state.cartItems.find(
        (ele) => ele.product === item.product
      );
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((ele) =>
            ele.product === exists.product ? item : ele
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }
    case DELETE_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (ele) => ele.product !== action.payload
        ),
      };

    case RESET_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
