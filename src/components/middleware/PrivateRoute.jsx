import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  let token = localStorage.getItem("loginToken");
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login/customer" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
