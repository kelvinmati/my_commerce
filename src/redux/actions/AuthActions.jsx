import * as types from "../types";
import axios from "axios";
import toast from "react-hot-toast";
import { getErrors, loginFail, registerFail } from "./ErrorActions";

const AUTH_API = "https://api-v1.lufumart.com/api/v1/auth";

// Authentication using the stored token
export const authToken = () => {
  // Get token from localStorage
  const token = localStorage.getItem("loginToken");
  // Headers
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  // if token exist ,add authorizarion

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

// user auth
export const userAuth = () => async (dispatch) => {
  try {
    const response = await axios.get(`${AUTH_API}/profile`, authToken());
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.USER_AUTH,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error.response.data);
    toast.error(error.response.data.message);
  }
};

// customer register
export const customerRegister = (payload) => async (dispatch) => {
  let { name, email, password, password_confirmation, phone, gender } = payload;
  // config
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // body
  const body = JSON.stringify({
    name,
    email,
    password,
    password_confirmation,
    phone,
    gender,
  });
  try {
    const response = await axios.post(`${AUTH_API}/signup`, body, config);
    const data = await response.data;

    console.log(data);
    if (data) {
      dispatch({
        type: types.CUSTOMER_REGISTER,
        payload: data,
      });
      const token = data.token;
      localStorage.setItem("loginToken", token);
      toast.success("Succesfully registered");
    }
  } catch (error) {
    dispatch(
      getErrors(error.response.data.message, types.CUSTOMER_REGISTER_FAIL)
    );
    dispatch(registerFail());
    toast.error(error.response.data.message);
    localStorage.removeItem("loginToken");
  }
};

// customer login
export const customerLogin = (payload) => async (dispatch) => {
  const { email, password } = payload;
  // config
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // body
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    const response = await axios.post(`${AUTH_API}/signin`, body, config);
    const data = await response.data;
    // console.log("data is", data);
    if (data) {
      dispatch({
        type: types.CUSTOMER_LOGIN,
        payload: data,
      });
      const token = data.token;
      localStorage.setItem("loginToken", token);
      toast.success("Succesfully logged in");
    }
  } catch (error) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
    dispatch(getErrors(error.response.data.message, types.CUSTOMER_LOGIN_FAIL));
    dispatch(loginFail());
    localStorage.removeItem("loginToken");
  }
};

//get customer profile
// export const getCustomer = () => (dispatch) => {
//   try {
//     axios.get(`${AUTH_API}/profile`, authToken()).then((res) => {
//       const user = res.data;
//       dispatch({
//         type: types.GET_CUSTOMER,
//         payload: user,
//       });
//     });
//   } catch (error) {
//     console.log(error.response);
//   }
// };

// logout

export const logout = () => (dispatch) => {
  dispatch({
    type: types.LOGOUT,
  });
  localStorage.removeItem("loginToken");
  toast.success("Succesfully logged out");
  userAuth();
};

// update customer profile

export const updateCustomer = (payload) => async (dispatch) => {
  const { name, email, phone } = payload;
  try {
    // body
    const body = JSON.stringify({
      name,
      email,
      phone,
    });
    const response = await axios.put(`${AUTH_API}/profile`, body, authToken());
    const data = await response.data;

    if (data) {
      dispatch({
        type: types.UPDATE_CUSTOMER_PROFILE,
        payload: data,
      });
      toast.success(`${data.message}`);
      dispatch(getErrors(data.message, types.UPDATE_CUSTOMER_PROFILE));
      dispatch(userAuth());
    }
  } catch (error) {
    console.log(error);
  }
};
