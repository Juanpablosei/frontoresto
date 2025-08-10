import React from 'react';
import UserInfo from '../auth/UserInfo';

const Header: React.FC = () => {
  return (
    <div className="restaurants-header">
      <div className="header-content">
        <div className="header-info">
          <h1>🏪 Mis Restaurantes</h1>
          <p>Gestiona tus restaurantes y configuraciones</p>
        </div>
        <div className="header-actions">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default Header;
