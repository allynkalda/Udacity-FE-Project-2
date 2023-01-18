import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation/Navigation";

const PrivateRoute = ({ redirectTo , authedUser }) => {
  const location = useLocation()
  return authedUser ?  (
    <Navigation><Outlet /></Navigation>
  ) : <Navigate 
    replace to={redirectTo}
    state={{ from: location }}
  />;
};
  
export default PrivateRoute;