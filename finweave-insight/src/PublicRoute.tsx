import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const session = localStorage.getItem('user-session');

  // If user is already logged in, redirect to dashboard
  if (session) return <Navigate to="/dashboard" replace />;

  // Otherwise, render the child routes
  return <Outlet />;
};

export default PublicRoute;
