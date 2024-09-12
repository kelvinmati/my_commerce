import * as types from "../types";
const initialState = {
  isAuthenticated: !!localStorage.getItem("loginToken"),
  loading: true,
  // isLoading: true,
  customer: {},
  errorMsg: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CUSTOMER_REGISTER:
    case types.CUSTOMER_LOGIN:
    case types.UPDATE_CUSTOMER_PROFILE:
      return {
        ...state,
        loading: false,
        // isLoading: false,
        isAuthenticated: true,
        customer: action.payload,
      };
    case types.CUSTOMER_REGISTER_FAIL:
      return {
        ...state,
        errorMsg: action.payload,
      };

    case types.USER_AUTH:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        customer: action.payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        customer: {},
      };
    case types.GET_CUSTOMER_ADDRESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
      };
    default:
      return state;
  }
};
