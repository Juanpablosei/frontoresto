import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserInfo from '../auth/UserInfo';

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">🍽️ RestoManager</h1>
        </div>
        
        <div className="flex items-center">
          <UserInfo />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
