
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthCheckProps {
  children: React.ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check if user data exists in localStorage
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  // Show nothing while we're checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
}
