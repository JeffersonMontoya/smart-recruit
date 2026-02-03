import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">Cargando...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
  
    if (isLoading) {
      return <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">Cargando...</div>;
    }
  
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
  };
