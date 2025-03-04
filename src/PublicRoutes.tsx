import { Navigate } from 'react-router-dom';
import { useAuth } from './components/pages/AuthProvider';
import { ReactNode } from "react";

export const PublicRoute = ({ children }: { children: ReactNode  }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};
