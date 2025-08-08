import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  redirectTo = '/auth/login'
}) => {
  const { isAuthenticated, user, hasAnyRole } = useAuthStore();
  const location = useLocation();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si hay roles requeridos, verificar que el usuario tenga al menos uno
  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    // Redirigir al dashboard unificado para todos los usuarios autenticados
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
