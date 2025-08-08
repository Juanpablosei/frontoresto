import React from 'react';
import { Button } from '../buttons';
import { OwnerDetailsProps } from './types';

const OwnerDetails: React.FC<OwnerDetailsProps> = ({ owner, onRestaurantSelect, selectedRestaurant }) => {
  return (
    <div className="owner-details">
      <div className="details-header">
        <div className="owner-info-card">
          <div className="owner-avatar-large">
            <span className="avatar-icon-large">👤</span>
          </div>
          <div className="owner-info-content">
            <h2 className="owner-name-large">{owner.name}</h2>
            <span className={`status-badge-large ${owner.isActive ? 'active' : 'inactive'}`}>
              {owner.isActive ? '🟢 Propietario Activo' : '🔴 Propietario Inactivo'}
            </span>
            <div className="owner-contact">
              <div className="contact-item">
                <span className="contact-label">📧 Email:</span>
                <span className="contact-value">{owner.email}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">📞 Teléfono:</span>
                <span className="contact-value">{owner.phone}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">📅 Registrado:</span>
                <span className="contact-value">
                  {new Date(owner.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="restaurants-section">
        <div className="section-header">
          <h3>🏪 Restaurantes de {owner.name}</h3>
          <div className="restaurant-stats">
            <span className="stat-item">
              <span className="stat-number">{owner.restaurants.length}</span>
              <span className="stat-label">Restaurantes</span>
            </span>
            <span className="stat-item">
              <span className="stat-number">
                {owner.restaurants.reduce((total, restaurant) => total + restaurant.employees.length, 0)}
              </span>
              <span className="stat-label">Empleados</span>
            </span>
            <span className="stat-item">
              <span className="stat-number">
                {owner.restaurants.filter(r => r.isOpen).length}
              </span>
              <span className="stat-label">Abiertos</span>
            </span>
          </div>
        </div>

        <div className="restaurants-content">
          {owner.restaurants.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏪</div>
              <h3>No hay restaurantes registrados</h3>
              <p>Este propietario aún no ha registrado ningún restaurante</p>
            </div>
          ) : (
            <div className="restaurants-grid">
              {owner.restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className={`restaurant-card ${selectedRestaurant?.id === restaurant.id ? 'selected' : ''} ${!restaurant.isOpen ? 'closed' : ''}`}
                  onClick={() => onRestaurantSelect(restaurant)}
                >
                  <div className="restaurant-header">
                    <div className="restaurant-icon">
                      <span className="icon">🏪</span>
                    </div>
                    <div className="restaurant-info">
                      <h4 className="restaurant-name">{restaurant.name}</h4>
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
                      <span className="detail-label">👥 Empleados:</span>
                      <span className="detail-value">{restaurant.employees.length}</span>
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
                                         <Button
                       variant="primary"
                       size="small"
                       onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                         e?.stopPropagation();
                         onRestaurantSelect(restaurant);
                       }}
                     >
                      👥 Ver Empleados
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;
