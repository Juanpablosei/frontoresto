import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: '📊',
      title: t('home.realTimeStats'),
      description: t('home.realTimeStatsDesc')
    },
    {
      icon: '👥',
      title: t('home.employeeManagement'),
      description: t('home.employeeManagementDesc')
    },
    {
      icon: '🍽️',
      title: t('home.menuControl'),
      description: t('home.menuControlDesc')
    },
    {
      icon: '📱',
      title: t('home.modernInterface'),
      description: t('home.modernInterfaceDesc')
    }
  ];

  return (
    <div className="py-16 lg:py-16">
      <h2 className="text-3xl lg:text-4xl font-semibold text-white text-center mb-12 shadow-lg">
        {t('home.whyChoose')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl"
          >
            <div className="text-5xl mb-4 block">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-4 shadow-md">
              {feature.title}
            </h3>
            <p className="text-white/80 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
