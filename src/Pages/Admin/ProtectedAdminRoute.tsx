// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";


// interface ProtectedAdminRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
//   const isAdmin = useSelector((state: RootState) => state.auth.user.role === "admin");
//   if (!isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   // ✔ Must always return a valid JSX element
//   return <>{children}</>;
// };

// export default ProtectedAdminRoute;
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  children: ReactNode;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  const isAdmin = user?.isAdmin === false;
  if (isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
export default ProtectedAdminRoute;
