

import { csrfFetch } from "./csrf";

// Action Types
export const ADD_RECENTLY_VIEWED = "ADD_RECENTLY_VIEWED";
export const REMOVE_RECENTLY_VIEWED = "REMOVE_RECENTLY_VIEWED";

// Action Creators
const addRecentlyViewedAction = (payload) => ({
  type: ADD_RECENTLY_VIEWED,
  payload,
});

// const removeRecentlyViewedAction = (id) => ({
//   type: REMOVE_RECENTLY_VIEWED,
//   payload: id,
// });

// Thunks
export const addRecentlyViewedThunk = (id) => async (dispatch, getState) => {
  const res = await csrfFetch(`/api/products/${id}`);

  if (!res.ok) {
    const error = await res.json();
    console.error("Error fetching product:", error);
    return;
  }

  const data = await res.json();
  const recentlyViewedItem = {
    product: data.id,
    name: data.name,
    imageUrl: data.imageUrl,
    price: data.price,
  };

  // Dispatch action to add to recently viewed
  dispatch(addRecentlyViewedAction(recentlyViewedItem));

  // Update localStorage
  localStorage.setItem(
    "recentlyViewed",
    JSON.stringify(getState().recent.recentlyViewedItems)
  );
};

// Initial State
const initialState = {
  recentlyViewedItems: JSON.parse(localStorage.getItem("recentlyViewed")) || [],
};

// Reducer
const recentlyViewedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECENTLY_VIEWED: {
      const item = action.payload;
      const exists = state.recentlyViewedItems.find(
        (ele) => ele.product === item.product
      );

      if (exists) {
        return state; // Do nothing if the item is already in the list
      }

      const updatedState = [item, ...state.recentlyViewedItems].slice(0, 5);

      return {
        ...state,
        recentlyViewedItems: updatedState,
      };
    }
    case REMOVE_RECENTLY_VIEWED:
      return {
        ...state,
        recentlyViewedItems: state.recentlyViewedItems.filter(
          (ele) => ele.product !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default recentlyViewedReducer;
