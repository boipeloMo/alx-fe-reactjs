import React from "react";
import { Navigate } from "react-router-dom";


const useAuth = () => {
  // This is a mock auth hook
  return { isAuthenticated: false };
};

const ProtectedRoute = ({ isAuthenticated, children }) => {
  
  const auth = useAuth();

  // Use prop if provided, otherwise fallback to auth hook
  const allowed = isAuthenticated ?? auth.isAuthenticated;

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
