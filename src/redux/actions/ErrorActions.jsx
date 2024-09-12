import * as types from "../types";

export const getErrors = (msg, typeId) => {
  return {
    type: types.GET_ERRORS,
    payload: {
      msg,
      typeId,
    },
  };
};
export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};

export const loginFail = () => {
  return {
    type: types.CUSTOMER_LOGIN_FAIL,
  };
};
export const registerFail = () => {
  return {
    type: types.CUSTOMER_REGISTER_FAIL,
  };
};

export const orderPaymentFail = () => {
  return {
    type: types.MAKE_ORDER_FAIL,
  };
};
export const networError = () => {
  return {
    type: types.NETWORK_ERROR,
  };
};
