import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../redux/actions/AuthActions";
const GetCustomers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    dispatch(userAuth());
  }, []);

  return <div>GetCustomers</div>;
};

export default GetCustomers;
