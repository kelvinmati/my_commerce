import * as types from "../types";
const initialState = {
  loading: true,
  orderMsg: null,
  shipping: null,
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MAKE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderMsg: action.payload,
      };
    case types.CALCULATE_SHIPPING_FEE:
      return {
        ...state,
        loading: false,
        shipping: action.payload,
      };

    default:
      return state;
  }
};
