import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const auth = useContext(AuthContext);

  // If loading, you can return null or a loader
  if (auth?.loading) return <div>Loading...</div>;

  // If not logged in, redirect to login
  if (!auth?.user) return <Navigate to="/login" />;

  // If logged in, render children
  return <>{children}</>;
};

export default ProtectedRoute;
