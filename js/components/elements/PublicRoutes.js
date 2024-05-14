import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ component: Component }) => {
  return sessionStorage.userInfo ? <Navigate to="/" /> : Component;
};

export default PublicRoutes;
