import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserInfo from '../auth/UserInfo';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>🍽️ RestoManager</h1>
        </div>
        
        <div className="navbar-user">
          <UserInfo />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
