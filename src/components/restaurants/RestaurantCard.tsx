import React from 'react';

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

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
  onEdit?: (restaurant: Restaurant, e: React.MouseEvent) => void;
  onShowEmployees?: (restaurant: Restaurant, e: React.MouseEvent) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onSelect,
  onEdit,
  onShowEmployees
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer group"
      onClick={() => onSelect(restaurant)}
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">🏪</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                restaurant.isOpen 
                  ? 'bg-green-500/20 text-green-100 border border-green-300/30' 
                  : 'bg-red-500/20 text-red-100 border border-red-300/30'
              }`}>
                {restaurant.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4">
        {/* Descripción */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {restaurant.description}
          </p>
        </div>

        {/* Detalles */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-gray-400">📍</span>
            <span className="text-gray-700 font-medium truncate">{restaurant.address}</span>
          </div>
          {restaurant.phone && (
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-gray-400">📞</span>
              <span className="text-gray-700 font-medium">{restaurant.phone}</span>
            </div>
          )}
          {restaurant.email && (
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-gray-400">📧</span>
              <span className="text-gray-700 font-medium truncate">{restaurant.email}</span>
            </div>
          )}
          {restaurant.createdAt && (
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-gray-400">📅</span>
              <span className="text-gray-700 font-medium">
                {new Date(restaurant.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Acciones */}
        {(onEdit || onShowEmployees) && (
          <div className="flex space-x-2 pt-4 border-t border-gray-100">
            {onEdit && (
              <button 
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1"
                onClick={(e) => onEdit(restaurant, e)}
              >
                <span>✏️</span>
                <span>Editar</span>
              </button>
            )}
            {onShowEmployees && (
              <button 
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1"
                onClick={(e) => onShowEmployees(restaurant, e)}
              >
                <span>👥</span>
                <span>Empleados</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
