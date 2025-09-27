import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const session = localStorage.getItem("user-session");

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renders child routes
};

export default PrivateRoute;
