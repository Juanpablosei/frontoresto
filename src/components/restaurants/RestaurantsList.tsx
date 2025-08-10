import React from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  isOpen: boolean;
  createdAt: string;
}

interface RestaurantsListProps {
  restaurants: Restaurant[];
  onEdit: (restaurant: Restaurant, e: React.MouseEvent) => void;
  onShowEmployees: (restaurant: Restaurant, e: React.MouseEvent) => void;
  onHideRestaurants: () => void;
}

const RestaurantsList: React.FC<RestaurantsListProps> = ({
  restaurants,
  onEdit,
  onShowEmployees,
  onHideRestaurants
}) => {
  const navigate = useNavigate();

  return (
    <div className="restaurants-section">
      <div className="section-header">
        <div className="header-actions-top">
          <button 
            className="back-btn"
            onClick={onHideRestaurants}
          >
            ← Volver al Dashboard
          </button>
        </div>
        <h2>📋 Mis Restaurantes ({restaurants.length})</h2>
        <p>Selecciona un restaurante para ver sus detalles</p>
      </div>

      {restaurants.length === 0 ? (
        <div className="empty-restaurants">
          <div className="empty-icon">🏪</div>
          <h3>No tienes restaurantes registrados</h3>
          <p>Crea tu primer restaurante para comenzar a gestionar tu negocio</p>
          <button 
            className="create-first-btn"
            onClick={() => navigate('/restaurants/create')}
          >
            ➕ Crear Mi Primer Restaurante
          </button>
        </div>
      ) : (
        <div className="restaurants-grid">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={(restaurant) => navigate(`/restaurants/${restaurant.id}`)}
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
