import React from "react";
import { Navigate, useLocation } from "react-router-dom";

//If user is loggedIn then as soon as he sends request to /,/login,/signup it redirects him to dashboard
const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
