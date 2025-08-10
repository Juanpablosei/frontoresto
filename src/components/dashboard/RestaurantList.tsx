import React from 'react';
import { Button } from '../buttons';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  isOpen: boolean;
  isActive: boolean;
  employees?: any[];
}

interface RestaurantListProps {
  restaurants: Restaurant[];
  onCreateRestaurant: () => void;
  onRestaurantSelect: (restaurantId: string) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onCreateRestaurant,
  onRestaurantSelect
}) => {
  const { t } = useTranslation();
  const { getCardBackground, getCardBorder, getTextColor, getSuccessColor, getDangerColor } = useThemeColors();

  return (
    <div className="space-y-6">
      {/* Header con botón de crear */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          🏪 {t('dashboard.myRestaurants')}
        </h2>
        <Button
          variant="primary"
          size="large"
          onClick={onCreateRestaurant}
        >
          ➕ {t('dashboard.createRestaurant')}
        </Button>
      </div>

      {/* Lista de restaurantes */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        {restaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-2xl font-semibold mb-2" style={{ color: getTextColor(900) }}>
              {t('dashboard.noRestaurantsYet')}
            </h3>
            <p className="text-lg mb-6" style={{ color: getTextColor(600) }}>
              {t('dashboard.startCreatingFirstRestaurant')}
            </p>
            <Button
              variant="primary"
              size="large"
              onClick={onCreateRestaurant}
            >
              🚀 {t('dashboard.createFirstRestaurant')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                onClick={() => onRestaurantSelect(restaurant.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold" style={{ color: getTextColor(900) }}>
                    {restaurant.name}
                  </h3>
                  <div className="flex gap-2">
                    <span 
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        restaurant.isOpen ? 'text-white' : 'text-white'
                      }`}
                      style={{
                        backgroundColor: restaurant.isOpen ? getSuccessColor() : getDangerColor()
                      }}
                    >
                      {restaurant.isOpen ? t('restaurant.open') : t('restaurant.closed')}
                    </span>
                    <span 
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        restaurant.isActive ? 'text-white' : 'text-white'
                      }`}
                      style={{
                        backgroundColor: restaurant.isActive ? getSuccessColor() : getDangerColor()
                      }}
                    >
                      {restaurant.isActive ? t('common.active') : t('common.inactive')}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm mb-4" style={{ color: getTextColor(600) }}>
                  {restaurant.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm" style={{ color: getTextColor(600) }}>
                    📍 {restaurant.address}
                  </span>
                </div>
                
                                 <div className="flex items-center gap-2">
                   <span className="text-sm" style={{ color: getTextColor(600) }}>
                     👥 {restaurant.employees?.length || 0} {t('dashboard.employees')}
                   </span>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
