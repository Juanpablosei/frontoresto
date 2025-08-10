import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';

const TablesTab: React.FC = () => {
  const { t } = useTranslation();
  const { 
    getCardBackground, 
    getCardBorder, 
    getTextColor
  } = useThemeColors();

  return (
    <div 
      className="p-6 rounded-xl border shadow-lg"
      style={{
        backgroundColor: getCardBackground(),
        borderColor: getCardBorder(),
      }}
    >
      <h3 
        className="text-xl font-bold mb-4"
        style={{ color: getTextColor(900) }}
      >
        🪑 {t('restaurant.tables')}
      </h3>
      <p 
        className="text-gray-600"
        style={{ color: getTextColor(600) }}
      >
        {t('restaurant.tableManagementComingSoon')}
      </p>
    </div>
  );
};

export default TablesTab;
