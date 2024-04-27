import { csrfFetch } from "./csrf";
const LOAD_REVIEW_Id = "reviews/LOAD_REVIEWS_Id";
const POST_REVIEW = "reviews/POST_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";

const updateReview = (updatedReview) => ({
  type: UPDATE_REVIEW,
  updatedReview,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

const insertReview = (payload) => ({
  type: POST_REVIEW,
  payload,
});
const loadReviewId = (reviews) => ({
  type: LOAD_REVIEW_Id,
  reviews,
});

export const removeReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteReview(reviewId));
  } else {
    const err = await res.json();
    return err;
  }
};

export const postReview = (payload, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/products/${id}/reviews`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  dispatch(insertReview(data));
  return data;
};
export const fetchReviews = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}/reviews`);
  const reviews = await res.json();
  if (res.ok) {
    dispatch(loadReviewId(reviews));
  } else {
    console.log("$%");
  }
};

export const editReview = (reviewId, updatedReviewData) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      body: JSON.stringify(updatedReviewData),
    });
    const updatedReview = await res.json();
    dispatch(updateReview(updatedReview));
    return updatedReview;
  } catch (err) {
    console.error("Error updating review:", err);
  }
};

const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW: {
      const updatedReviews = state.reviews.Reviews.filter(
        (review) => review.id !== action.reviewId
      );
      console.log("Updated Reviews:", updatedReviews);
      return { ...state, reviews: updatedReviews };
    }
    case LOAD_REVIEW_Id:
      return { ...state, reviews: action.reviews };
    case POST_REVIEW:
      return { ...state, reviews: action.payload };
    case UPDATE_REVIEW: {
      const updatedReviews = state.reviews.Reviews.map((review) =>
        review.id === action.updatedReview.id ? action.updatedReview : review
      );
      return { ...state, reviews: updatedReviews };
    }
    default:
      return state;
  }
};
export default reviewReducer;
