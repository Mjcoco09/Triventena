import { csrfFetch } from "./csrf";
export const ADD_WISH = "ADD_TO_WISH"
export const DELETE_WISH = "Delete_WISH"

const addToWishAction = (payload) => ({
    type:ADD_WISH,
    payload,
})

export const addToWishThunk = (id) => async (dispatch,getState) => {
    const res = await csrfFetch(`/api/products/${id}`);
    if (!res.ok){
        const error = await res.json();
    console.error("Error fetching product:", error);
    return;
    }
    const data = await res.json()
    const cartItem = {
        product: data.id,
        name: data.name,
        imageUrl: data.imageUrl,
        price: data.price,
      };
      dispatch (addToWishAction(cartItem))
      localStorage.setItem("wish", JSON.stringify(getState().cart.cartItems));
}

export const removeWish = (id) => (dispatch, getState) => {
    dispatch({
      type: DELETE_WISH,
      payload: id,
    });

    localStorage.setItem("wish", JSON.stringify(getState().cart.cartItems));
  };
  const initialState = {
    wishItems: [],
  };
  export const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_WISH: {
        const item = action.payload;

        const exists = state.wishItems.find(
          (ele) => ele.product === item.product
        );
        if (exists) {
          return {
            ...state,
            wishItems: state.wishItems.map((ele) =>
              ele.product === exists.product ? item : ele
            ),
          };
        } else {
          return {
            ...state,
            wishItems: [...state.wishItems, item],
          };
        }
      }
      case DELETE_WISH:
        return {
          ...state,
          wishItems: state.wishItems.filter(
            (ele) => ele.product !== action.payload
          ),
        };
      default:
        return state;
    }
}
export default wishlistReducer;
