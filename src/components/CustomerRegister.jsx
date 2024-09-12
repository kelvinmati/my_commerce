import React, { useEffect, useState } from "react";
import favicon from "../favicon.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { customerRegister } from "../redux/actions/AuthActions";

const CustomerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location?.state?.from?.pathname || "/";
  console.log("path is", path);
  // set  button loading on-submit
  const [isLoading, setIsLoading] = useState(false);
  // get  user auth & error from state
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state?.error);
  console.log("Register error is", error);
  // initializing react hook form
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });
  // getting the fileds value
  const onSubmit = (data) => {
    if (data) {
      setIsLoading(true);
      dispatch(customerRegister(data));
    }
  };
  // ensuring the user is authenticated
  useEffect(() => {
    if (auth) {
      setIsLoading(false);
      navigate(path);
    }
  }, [auth]);
  // change button loading state if credentials are wrong
  useEffect(() => {
    if (error.typeID === "CUSTOMER_REGISTER_FAIL") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [error]);
  return (
    <div className=" items-center flex justify-center   w-full bg-uniform_grey py-10  ">
      <section className="rounded  bg-white w-11/12 md:w-1/3">
        <h2 className=" rounded-tr rounded-tl  p-5 font-bold  bg-green text-center text-white">
          <img
            src={favicon}
            alt="favicon"
            className=" mx-auto mb-4 h-12 w-12 "
          />
          CREATE YOUR LUFUMART ACCOUNT
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="  p-4 flex flex-col space-y-4  "
        >
          <input
            type="text"
            placeholder="Name"
            className="border  focus:outline-0 p-2 w-full "
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red"> Name is required </p>}
          <input
            type="text"
            placeholder="Email"
            className="border  focus:outline-0 p-2  w-full"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red"> Email is required </p>}
          <div className="flex space-x-3">
            <div>
              <input
                type="password"
                placeholder="Password"
                className="border  focus:outline-0 p-2  w-full"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <p className="text-red"> Password is required </p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder=" Confirm Password"
                className="border  focus:outline-0 p-2  w-full"
                {...register("password_confirmation", {
                  required: true,
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const password = getValues("password");
                      return password === value || "Passwords do not match!";
                    },
                  },
                })}
              />
              {errors.password_confirmation && (
                <p className="text-red">Passwords do not match!</p>
              )}
            </div>
          </div>
          <input
            type="text"
            placeholder=" Phone Number"
            className="border  focus:outline-0 p-2  w-full"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <p className="text-red"> Phone Number is required </p>
          )}
          <select
            className="border  focus:outline-0 p-2  w-full bg-white"
            placeholder="Gender"
            {...register("gender", { required: true })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="text-red"> Gender is required </p>}

          {/* <button
            type="submit "
            className="border focus:outline-0 p-2 bg-green text-white rounded w-full  font-bold"
          >
            REGISTER
          </button> */}

          <button
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
            <div>REGISTER</div>
          </button>

          <div>
            I already have an account.
            <Link to="/login/customer">
              <span className="text-orange"> Login</span>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CustomerRegister;

// kelvinmati @gmail.com
// kelvinmatitest
