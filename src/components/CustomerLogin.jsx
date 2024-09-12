import React, { useEffect, useState } from "react";

import favicon from "../favicon.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { customerLogin } from "../redux/actions/AuthActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
const CustomerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location?.state?.from?.pathname || "/";
  console.log("login path is", path);
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const error = useSelector((state) => state?.error);
  // console.log("error", error);
  // console.log("isLoading", loading);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });
  // getting the fileds value
  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch(customerLogin(data));
  };

  useEffect(() => {
    if (auth) {
      setIsLoading(false);
      navigate(path);
    }
  }, [auth]);
  // change button loading state if credentials are wrong

  useEffect(() => {
    if (error.typeID === "CUSTOMER_LOGIN_FAIL") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [error]);
  return (
    <div className="items-center flex justify-center  py-10 w-full bg-uniform_grey  ">
      <section className="rounded  bg-white w-11/12 md:w-1/3">
        <h2 className=" rounded-tr rounded-tl  p-5 font-bold  bg-green text-center text-white">
          <img
            src={favicon}
            alt="favicon"
            className=" mx-auto mb-4 h-12 w-12 "
          />
          LOGIN TO YOUR LUFUMART ACCOUNT
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="  p-4 flex flex-col space-y-4  "
        >
          <input
            type="text"
            placeholder="Email"
            className="border  focus:outline-0 p-2  w-full"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red">Email is required</p>}

          <input
            type="password"
            placeholder="Password"
            className="border  focus:outline-0 p-2  w-full"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red"> Password is required </p>
          )}

          <button
            // onClick={handleLoading}
            type="submit "
            className={
              isLoading
                ? "opacity-50 border flex justify-center items-center space-x-4 focus:outline-0 p-2 bg-green text-white rounded w-full  font-bold"
                : "border flex justify-center items-center space-x-4 focus:outline-0 p-2 bg-green text-white rounded w-full  font-bold"
            }
          >
            <div
              className={
                isLoading
                  ? "border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-6 h-6"
                  : "hidden"
              }
            ></div>
            <div>LOGIN</div>
          </button>

          <div>
            Don't have an account ?
            <Link to="/register/customer">
              <span className="text-orange"> Create account</span>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CustomerLogin;
