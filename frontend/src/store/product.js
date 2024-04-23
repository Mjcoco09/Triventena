import { csrfFetch } from "./csrf";
export const GET_PRODUCT = "GET_PRODUCT";
export const PRODUCT_PASS = "PRODUCT_PASS";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const PRODUCT_PASS_DETAILS = "PRODUCT_PASS_DETAILS";
export const PRODUCT_FAIL_DETAILS = "PRODUCT_FAIL_DETAILS";
export const PRODUCT_RESET_DETAILS = "PRODUCT_FAIL_DETAILS";


const getProductAction = () => ({
    type: GET_PRODUCT,
  });

  const getProductPassAction = (payload) => ({
    type: PRODUCT_PASS,
    payload,
  });

  const getProductFailAction = (error) => ({
    type: PRODUCT_FAIL,
    payload: error,
  });

  const getProductDetailsAction = () => ({
    type: GET_PRODUCT_DETAILS,
  });

  const getProductDetailsPassAction = (payload) => ({
    type: PRODUCT_PASS_DETAILS,
    payload,
  });

  const getProductDetailsFailAction = (error) => ({
    type: PRODUCT_FAIL_DETAILS,
    payload: error,
  });

  const resetProductDetailsAction = () => ({
    type: PRODUCT_RESET_DETAILS,
  });


  export const getProducts = () => async (dispatch) => {
    dispatch(getProductAction());

    try {
      const res = await csrfFetch("/api/products");
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.message || "Failed to fetch products");
      }

      dispatch(getProductPassAction(payload));
    } catch (error) {
      dispatch(getProductFailAction(error.message));
    }
  };



  export const getProductDetails = (id) => async (dispatch) => {
    dispatch(getProductDetailsAction());

    try {
      const res = await csrfFetch(`/api/products/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch product details");
      }

      dispatch(getProductDetailsPassAction(data));
    } catch (error) {
      dispatch(getProductDetailsFailAction(error.message));
    }
  };

  export const removeProductDetails = () => (dispatch) => {
    dispatch(resetProductDetailsAction());
  };


export const getProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case GET_PRODUCT:
        return {
          loading: true,
          products: [],
        };
      case PRODUCT_PASS:
        return {
          products: action.payload,
          loading: false,
        };
      case PRODUCT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export const getProductDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case GET_PRODUCT_DETAILS:
        return {
          loading: true,
        };
      case PRODUCT_PASS_DETAILS:
        return {
          loading: false,
          product: action.payload,
        };
      case PRODUCT_FAIL_DETAILS:
        return {
          loading: false,
          error: action.payload,
        };
      case PRODUCT_RESET_DETAILS:
        return {
          product: {},
        };
      default:
        return state;
    }
  };
