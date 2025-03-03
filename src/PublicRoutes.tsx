import { Navigate } from 'react-router-dom';
import { useAuth } from './components/pages/AuthProvider';

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};