import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    setLoading,
    setError,
    clearError,
    hasRole,
    hasAnyRole
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    setLoading,
    setError,
    clearError,
    hasRole,
    hasAnyRole,
    // Utilidades adicionales
    isAdmin: hasRole('ADMIN'),
    isClientOwner: hasRole('CLIENT_OWNER'),
    isManager: hasRole('MANAGER'),
    isWaiter: hasRole('WAITER'),
    isCook: hasRole('COOK'),
    isCashier: hasRole('CASHIER'),
    isHost: hasRole('HOST'),
    isEmployee: hasRole('EMPLOYEE')
  };
};
