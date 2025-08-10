import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();
  const { getInfoColor } = useThemeColors();

  const tabs = [
    { id: 'overview', label: t('restaurant.overview'), icon: '📊' },
    { id: 'employees', label: t('restaurant.employees'), icon: '👥' },
    { id: 'menus', label: t('restaurant.menus'), icon: '🍽️' },
    { id: 'platos', label: t('common.platos'), icon: '🍴' },
    { id: 'products', label: t('restaurant.products'), icon: '📦' },
    { id: 'tables', label: t('restaurant.tables'), icon: '🪑' },
    { id: 'stats', label: t('restaurant.statistics'), icon: '📈' }
  ];

  return (
    <div className="mb-6">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === tab.id 
                ? 'text-white shadow-lg' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{
              backgroundColor: activeTab === tab.id ? getInfoColor() : 'transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
