import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import RestaurantCard from './RestaurantCard';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  isOpen: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  clientId?: string;
  ownerId?: string;
}

interface RestaurantsListProps {
  restaurants: Restaurant[];
  // Props opcionales para diferentes modos
  mode?: 'dashboard' | 'admin-panel' | 'restaurants-page';
  showBackButton?: boolean;
  showCreateButton?: boolean;
  showHeader?: boolean;
  selectedRestaurant?: Restaurant | null;
  isLoading?: boolean;
  // Callbacks
  onEdit?: (restaurant: Restaurant, e: React.MouseEvent) => void;
  onShowEmployees?: (restaurant: Restaurant, e: React.MouseEvent) => void;
  onHideRestaurants?: () => void;
  onRestaurantSelect?: (restaurant: Restaurant) => void;
  onCreateRestaurant?: (data?: any) => void;
}

const RestaurantsList: React.FC<RestaurantsListProps> = ({
  restaurants,
  mode = 'restaurants-page',
  showBackButton = false,
  showCreateButton = true,
  showHeader = true,
  selectedRestaurant = null,
  isLoading = false,
  onEdit,
  onShowEmployees,
  onHideRestaurants,
  onRestaurantSelect,
  onCreateRestaurant
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCreateRestaurant = () => {
    if (onCreateRestaurant) {
      onCreateRestaurant();
    } else {
      navigate('/create-restaurant');
    }
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    if (onRestaurantSelect) {
      onRestaurantSelect(restaurant);
    } else {
      navigate(`/restaurants/${restaurant.id}`);
    }
  };

  const handleBackToDashboard = () => {
    if (onHideRestaurants) {
      onHideRestaurants();
    } else {
      navigate('/dashboard');
    }
  };

  // Renderizado condicional según el modo
  if (mode === 'dashboard') {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              🏪 {t('dashboard.myRestaurants')}
            </h2>
            {showCreateButton && (
              <button
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={handleCreateRestaurant}
                disabled={isLoading}
              >
                ➕ {t('dashboard.createRestaurant')}
              </button>
            )}
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {restaurants.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                {t('dashboard.noRestaurantsYet')}
              </h3>
              <p className="text-lg mb-6 text-gray-600">
                {t('dashboard.startCreatingFirstRestaurant')}
              </p>
              <button
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={handleCreateRestaurant}
                disabled={isLoading}
              >
                🚀 {t('dashboard.createFirstRestaurant')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group"
                  onClick={() => handleRestaurantSelect(restaurant)}
                >
                  {/* Header con icono y estado */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-lg">🏪</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {restaurant.name}
                      </h3>
                    </div>
                  </div>

                  {/* Estados */}
                  <div className="flex gap-2 mb-4">
                    <span 
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                        restaurant.isOpen 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      {restaurant.isOpen ? t('restaurant.open') : t('restaurant.closed')}
                    </span>
                    {restaurant.isActive !== undefined && (
                      <span 
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                          restaurant.isActive 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          restaurant.isActive ? 'bg-blue-500' : 'bg-gray-500'
                        }`}></span>
                        {restaurant.isActive ? t('common.active') : t('common.inactive')}
                      </span>
                    )}
                  </div>
                  
                  {/* Descripción */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {restaurant.description}
                  </p>
                  
                  {/* Detalles */}
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-400">📍</span>
                      <span className="truncate text-gray-700 font-medium">{restaurant.address}</span>
                    </div>
                    {restaurant.email && (
                      <div className="flex items-center">
                        <span className="mr-2 text-gray-400">📧</span>
                        <span className="truncate text-gray-700">{restaurant.email}</span>
                      </div>
                    )}
                    {restaurant.phone && (
                      <div className="flex items-center">
                        <span className="mr-2 text-gray-400">📞</span>
                        <span className="truncate text-gray-700">{restaurant.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Indicador de hover */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center text-amber-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span>Ver detalles</span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'admin-panel') {
    return (
      <div className="restaurant-list">
        <div className="list-header">
          <h2>🏪 Mis Restaurantes</h2>
          {showCreateButton && (
            <button
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              onClick={handleCreateRestaurant}
              disabled={isLoading}
            >
              ➕ Nuevo Restaurante
            </button>
          )}
        </div>

        <div className="list-content">
          {restaurants.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏪</div>
              <h3>No hay restaurantes</h3>
              <p>Crea tu primer restaurante para comenzar</p>
            </div>
          ) : (
            <div className="restaurant-items">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className={`restaurant-item ${
                    selectedRestaurant?.id === restaurant.id ? 'selected' : ''
                  }`}
                  onClick={() => handleRestaurantSelect(restaurant)}
                >
                  <div className="item-header">
                    <h3>{restaurant.name}</h3>
                    <span className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
                      {restaurant.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
                    </span>
                  </div>
                  <p className="item-description">{restaurant.description}</p>
                  <div className="item-details">
                    {restaurant.email && <span className="detail-item">📧 {restaurant.email}</span>}
                    {restaurant.phone && <span className="detail-item">📞 {restaurant.phone}</span>}
                  </div>
                  <div className="item-address">
                    📍 {restaurant.address}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Modo por defecto: restaurants-page
  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            {showBackButton && (
              <button 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                onClick={handleBackToDashboard}
              >
                <span>←</span>
                <span>Volver al Dashboard</span>
              </button>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              📋 Mis Restaurantes ({restaurants.length})
            </h2>
            <p className="text-gray-600 text-lg">
              Selecciona un restaurante para ver sus detalles
            </p>
          </div>
        </div>
      )}

      {restaurants.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🏪</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No tienes restaurantes registrados</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Crea tu primer restaurante para comenzar a gestionar tu negocio
          </p>
          <button 
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            onClick={handleCreateRestaurant}
          >
            ➕ Crear Mi Primer Restaurante
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={handleRestaurantSelect}
              onEdit={onEdit}
              onShowEmployees={onShowEmployees}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantsList;
