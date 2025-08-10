import React from 'react';
import UserInfo from '../auth/UserInfo';
import { useTranslation } from '../../hooks/useTranslation';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 py-8">
      <div className="max-w-6xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 shadow-lg">
            ➕ {t('restaurant.create')}
          </h1>
          <p className="text-white/90 text-lg">
            {t('restaurant.createDescription')}
          </p>
        </div>
        <div className="flex gap-4">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};

export default Header;
