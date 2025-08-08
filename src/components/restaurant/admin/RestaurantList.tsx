import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from './types';
import { Button } from '../../buttons';

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  onCreateRestaurant: (data: any) => void;
  isLoading: boolean;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  selectedRestaurant,
  onRestaurantSelect,
  onCreateRestaurant,
  isLoading
}) => {
  const navigate = useNavigate();

  const handleCreateRestaurant = () => {
    navigate('/restaurants/create');
  };

  return (
    <div className="restaurant-list">
      <div className="list-header">
        <h2>🏪 Mis Restaurantes</h2>
        <Button
          variant="primary"
          size="small"
          onClick={handleCreateRestaurant}
          disabled={isLoading}
        >
          ➕ Nuevo Restaurante
        </Button>
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
                onClick={() => onRestaurantSelect(restaurant)}
              >
                <div className="item-header">
                  <h3>{restaurant.name}</h3>
                  <span className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
                    {restaurant.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
                  </span>
                </div>
                <p className="item-description">{restaurant.description}</p>
                <div className="item-details">
                  <span className="detail-item">📧 {restaurant.email}</span>
                  <span className="detail-item">📞 {restaurant.phone}</span>
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
};

export default RestaurantList;
