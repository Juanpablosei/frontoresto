import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../buttons';
import { LanguageSelector } from '../language';
import { useTranslation } from '../../hooks/useTranslation';

interface HeaderProps {
  onEnter: () => void;
}

const Header: React.FC<HeaderProps> = ({ onEnter }) => {
  const { t } = useTranslation();

  return (
    <header className="p-6 lg:p-8 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-white shadow-lg">
            🍽️ {t('home.title')}
          </h1>
          <p className="text-sm text-white/80 font-light">
            {t('home.subtitle')}
          </p>
        </div>
        <div className="flex gap-4">
          <LanguageSelector />
          <Button
            variant="primary"
            size="medium"
            onClick={onEnter}
          >
            🚀 {t('home.enter')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
