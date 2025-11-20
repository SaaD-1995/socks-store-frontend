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
import Spinner from "../../ui/Spinner";

interface Props {
  children: ReactNode;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();
  setTimeout(() => {
    loading && <div className="min-h-screen flex justify-center items-center"><Spinner size={34} color="red"/></div>;
  }, 2000);
  if (loading) return <div className="min-h-screen flex justify-center items-center"><Spinner size={50} color="red"/></div>;
  const isAdmin = user?.isAdmin === false;
  if (isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
export default ProtectedAdminRoute;
