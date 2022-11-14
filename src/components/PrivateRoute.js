import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectTo , authedUser }) => {
  return authedUser ?  <Outlet /> : <Navigate replace to={redirectTo} />;
};
  
export default PrivateRoute;