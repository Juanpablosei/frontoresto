import React from 'react';
import UserInfo from '../auth/UserInfo';

const Header: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">🏪 Mis Restaurantes</h1>
            <p className="text-gray-600 mt-1">Gestiona tus restaurantes y configuraciones</p>
          </div>
          <div className="flex-shrink-0">
            <UserInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
