import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../buttons';
import './UserInfo.css';

const UserInfo: React.FC = () => {
  const { user, logout } = useAuthStore();

  if (!user) {
    return null;
  }

  const getRoleDisplayName = (role: string) => {
    const roleNames: Record<string, string> = {
      'ADMIN': '👑 Administrador',
      'CLIENT_OWNER': '🏪 Propietario',
      'MANAGER': '👔 Manager',
      'WAITER': '🍽️ Mozo',
      'COOK': '👨‍🍳 Cocinero',
      'CASHIER': '💰 Cajero',
      'HOST': '👋 Host',
      'EMPLOYEE': '👤 Empleado'
    };
    return roleNames[role] || role;
  };

  const getRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      'ADMIN': '#8B4513',
      'CLIENT_OWNER': '#D2691E',
      'MANAGER': '#CD853F',
      'WAITER': '#DEB887',
      'COOK': '#F4A460',
      'CASHIER': '#DAA520',
      'HOST': '#BDB76B',
      'EMPLOYEE': '#BC8F8F'
    };
    return roleColors[role] || '#666';
  };

  return (
    <div className="user-info">
      <div className="user-avatar">
        <span className="avatar-icon">👤</span>
      </div>
      
      <div className="user-details">
        <div className="user-name">{user.name}</div>
        <div className="user-email">{user.email}</div>
        <div 
          className="user-role"
          style={{ backgroundColor: getRoleColor(user.role) }}
        >
          {getRoleDisplayName(user.role)}
        </div>
      </div>

      <div className="user-actions">
        <Button
          variant="secondary"
          size="small"
          onClick={logout}
        >
          🚪 Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
