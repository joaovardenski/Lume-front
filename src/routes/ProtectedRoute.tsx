import { Navigate } from "react-router-dom";
import { useContext } from "react";
import type { JSX } from "react";
import { AuthContext } from "../features/authentication/contexts/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/not-authenticated" replace />;
  }

  return children;
}
