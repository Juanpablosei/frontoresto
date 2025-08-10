import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="p-8 bg-black/20 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-white/70 text-sm">
          {t('home.footer')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
