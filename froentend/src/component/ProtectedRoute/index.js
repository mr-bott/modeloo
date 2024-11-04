// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element, redirectTo }) => {
  const isAuthenticated = Cookies.get('jwt') !== undefined;

  console.log(isAuthenticated)
  // If user is authenticated and trying to access login, redirect to home (or any other route)
  if (isAuthenticated && redirectTo === "/login") {
    return <Navigate to="/home" replace />;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
