import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const PrivateRoute = ({ redirectTo , authedUser }) => {
  return authedUser ?  (
    <Navigation><Outlet /></Navigation>
  ) : <Navigate replace to={redirectTo} />;
};
  
export default PrivateRoute;