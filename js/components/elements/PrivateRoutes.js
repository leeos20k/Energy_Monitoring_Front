import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ component: Component }) => {
  return sessionStorage.userInfo ? Component : <Navigate to="/Login" {...alert("로그인 후 이용가능합니다.")} />;
};

export default PrivateRoutes;
