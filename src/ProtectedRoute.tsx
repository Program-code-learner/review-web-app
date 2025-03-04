// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from './components/pages/AuthProvider';

// export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return children;
// };
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./components/pages/AuthProvider";
import { ReactNode } from "react"; // ✅ Import ReactNode

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>; // ✅ Wrap children in a fragment
};
