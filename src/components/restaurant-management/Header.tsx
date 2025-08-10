import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSelector } from '../language';
import Button from '../buttons/Button';

interface HeaderProps {
  onBackToRestaurants: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBackToRestaurants }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          onClick={onBackToRestaurants}
        >
          {t('restaurant.backToRestaurants')}
        </Button>
        <h1 
          className="text-3xl font-bold"
          style={{ color: 'white' }}
        >
          {t('restaurant.adminPanel')}
        </h1>
      </div>
      <LanguageSelector />
    </div>
  );
};

export default Header;
