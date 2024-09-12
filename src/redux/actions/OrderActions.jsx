import * as types from "../types";
import axios from "axios";
import toast from "react-hot-toast";
import { authToken } from "./AuthActions";
import { getErrors, orderPaymentFail } from "./ErrorActions";
const ORDER_API = "https://api-v1.lufumart.com/api/v1/orders";
// calculate shipping fee
export const calculateShipping = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api-v1.lufumart.com/api/v1/orders/calculate-shipping-cost`,
      authToken()
    );
    const data = await response.data;
    // console.log("data", data?.shippingFee);
    if (data) {
      dispatch({
        type: types.CALCULATE_SHIPPING_FEE,
        payload: data.shippingFee,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};
// make payment for the order
export const orderPayment = (payload) => async (dispatch) => {
  const { paymentMethod, deliveryAddress, phone } = payload;
  try {
    //   body
    const body = JSON.stringify({
      paymentMethod,
      deliveryAddress,
      phone,
    });
    const response = await axios.post(`${ORDER_API}/create`, body, authToken());
    const data = await response.data;
    // console.log("payment response", data);
    if (data) {
      dispatch({
        type: types.MAKE_ORDER_SUCCESS,
        payload: data,
      });
      toast.success("Succefuly made an order");
    }
  } catch (error) {
    // console.log("order console err", error.response);
    dispatch(getErrors(error.response.data.message, types.MAKE_ORDER_FAIL));
    dispatch(orderPaymentFail());
    toast.error(error.response.data.message);
  }
};

// 243898724400
