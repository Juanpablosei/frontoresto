import React from 'react';
import { Button } from '../buttons';
import { useTranslation } from '../../hooks/useTranslation';

interface HeroProps {
  onStartNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartNow }) => {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-16 lg:mb-16 py-16 lg:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight shadow-lg">
          {t('home.heroTitle')}
        </h1>
        <p className="text-lg lg:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
          {t('home.heroDescription')}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            variant="primary"
            size="large"
            onClick={onStartNow}
            fullWidth
          >
            🚀 {t('home.startNow')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
