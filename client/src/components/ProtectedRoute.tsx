// src/components/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in → redirect to login page
    return <Navigate to="/" replace />;
  }

  // Logged in → render the component
  return <>{children}</>;
};

export default ProtectedRoute;
