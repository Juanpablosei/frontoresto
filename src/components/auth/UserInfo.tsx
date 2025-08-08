import React from 'react';
import { useAuthStore } from '../../store/authStore';
import ThemeToggle from '../theme/ThemeToggle';

const UserInfo: React.FC = () => {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-white/95 backdrop-blur-lg rounded-xl border border-gray-200 shadow-lg transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-800 to-amber-700 rounded-full flex-shrink-0">
        <span className="text-2xl text-white">👤</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-800 text-base mb-1">{user.name}</div>
        <div className="text-gray-600 text-sm mb-2">{user.email}</div>
        <div 
          className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold uppercase shadow-sm"
          style={{
            backgroundColor: user.role === 'ADMIN' ? '#dc2626' : 
                           user.role === 'CLIENT_OWNER' ? '#059669' : '#6b7280'
          }}
        >
          {user.role === 'ADMIN' ? 'Administrador' : 
           user.role === 'CLIENT_OWNER' ? 'Propietario' : 'Usuario'}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
