import React from 'react';

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

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
  onEdit: (restaurant: Restaurant, e: React.MouseEvent) => void;
  onShowEmployees: (restaurant: Restaurant, e: React.MouseEvent) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onSelect,
  onEdit,
  onShowEmployees
}) => {
  return (
    <div
      className="restaurant-card"
      onClick={() => onSelect(restaurant)}
    >
      <div className="restaurant-header">
        <div className="restaurant-icon">
          <span className="icon">🏪</span>
        </div>
        <div className="restaurant-info">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <span className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
            {restaurant.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
          </span>
        </div>
      </div>

      <div className="restaurant-details">
        <div className="detail-item">
          <span className="detail-label">📍 Dirección:</span>
          <span className="detail-value">{restaurant.address}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">📞 Teléfono:</span>
          <span className="detail-value">{restaurant.phone}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">📧 Email:</span>
          <span className="detail-value">{restaurant.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">📅 Creado:</span>
          <span className="detail-value">
            {new Date(restaurant.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="restaurant-description">
        <p>{restaurant.description}</p>
      </div>

      <div className="restaurant-actions">
        <button 
          className="action-btn-small"
          onClick={(e) => onEdit(restaurant, e)}
        >
          ✏️ Editar
        </button>
        <button 
          className="action-btn-small"
          onClick={(e) => onShowEmployees(restaurant, e)}
        >
          👥 Empleados
        </button>
        <button className="action-btn-small">
          🍽️ Menús
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
