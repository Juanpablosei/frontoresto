import React from 'react';
import { useAuthStore } from '../../store/authStore';
import ThemeToggle from '../theme/ThemeToggle';
import { useThemeColors } from '../../hooks/useThemeColors';

const UserInfo: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { 
    getCardBackground, 
    getCardBorder, 
    getTextColor, 
    getDangerColor,
    getInfoColor,
    getSuccessColor 
  } = useThemeColors();

  if (!user) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return getDangerColor();
      case 'CLIENT_OWNER':
        return getSuccessColor();
      default:
        return getInfoColor();
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'CLIENT_OWNER':
        return 'Propietario';
      default:
        return 'Usuario';
    }
  };

  return (
    <div 
      className="flex items-center gap-4 p-4 rounded-xl border shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
      style={{
        backgroundColor: getCardBackground(),
        borderColor: getCardBorder(),
      }}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0"
           style={{ backgroundColor: getInfoColor() }}>
        <span className="text-2xl text-white">👤</span>
      </div>

      <div className="flex-1 min-w-0">
        <div 
          className="font-semibold text-base mb-1"
          style={{ color: getTextColor(900) }}
        >
          {user.name}
        </div>
        <div 
          className="text-sm mb-2"
          style={{ color: getTextColor(600) }}
        >
          {user.email}
        </div>
        <div
          className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold uppercase shadow-sm"
          style={{ backgroundColor: getRoleColor(user.role) }}
        >
          {getRoleName(user.role)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium text-white"
          style={{ backgroundColor: getDangerColor() }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
