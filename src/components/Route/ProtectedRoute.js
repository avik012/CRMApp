import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, isAdmin }) => {
  const { user, loading } = useSelector((state) => state.user);
  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to={"/login"} />;
    }
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to={"/login"} />;
    }
  }
  return <Outlet />;
};

export default ProtectedRoute;
