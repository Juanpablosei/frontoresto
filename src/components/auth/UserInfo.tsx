import React from 'react';
import { useAuthStore } from '../../store/authStore';
import ThemeToggle from '../theme/ThemeToggle';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useTranslation } from '../../hooks/useTranslation';

const UserInfo: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
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
        return t('auth.roles.admin');
      case 'CLIENT_OWNER':
        return t('auth.roles.owner');
      default:
        return t('auth.roles.user');
    }
  };

  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-xl border shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl max-w-lg"
      style={{
        backgroundColor: getCardBackground(),
        borderColor: getCardBorder(),
      }}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
           style={{ backgroundColor: getInfoColor() }}>
        <span className="text-lg text-white">👤</span>
      </div>

      <div className="flex-1 min-w-0">
        <div 
          className="font-semibold text-sm mb-1 truncate"
          style={{ color: getTextColor(900) }}
        >
          {user.name}
        </div>
        <div 
          className="text-xs mb-1 truncate"
          style={{ color: getTextColor(600) }}
        >
          {user.email}
        </div>
        <div
          className="inline-block px-2 py-0.5 rounded-full text-white text-xs font-semibold uppercase shadow-sm"
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
          {t('auth.logout')}
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
