import React, { useState } from 'react';
import { Restaurant } from './types';
import { Button } from '../../buttons';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  onUpdate: (restaurantId: string, data: Partial<Restaurant>) => void;
  isLoading: boolean;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
  onUpdate,
  isLoading
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Restaurant>>(restaurant);

  const handleSave = async () => {
    await onUpdate(restaurant.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(restaurant);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Restaurant, value: string) => {
    setEditData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="restaurant-details">
      <div className="details-header">
        <h2>📋 Detalles del Restaurante</h2>
        <div className="header-actions">
          {isEditing ? (
            <>
              <Button
                variant="success"
                size="small"
                onClick={handleSave}
                loading={isLoading}
                disabled={isLoading}
              >
                💾 Guardar
              </Button>
              <Button
                variant="secondary"
                size="small"
                onClick={handleCancel}
                disabled={isLoading}
              >
                ❌ Cancelar
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="small"
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
            >
              ✏️ Editar
            </Button>
          )}
        </div>
      </div>

      <div className="details-content">
        <div className="detail-section">
          <h3>🏪 Información Básica</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Nombre:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{restaurant.name}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Descripción:</label>
              {isEditing ? (
                <textarea
                  value={editData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="edit-textarea"
                  rows={3}
                />
              ) : (
                <span>{restaurant.description}</span>
              )}
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>📍 Información de Contacto</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Dirección:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{restaurant.address}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Teléfono:</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{restaurant.phone}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>{restaurant.email}</span>
              )}
            </div>
            <div className="detail-item">
              <label>Sitio Web:</label>
              {isEditing ? (
                <input
                  type="url"
                  value={editData.website || ''}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="edit-input"
                />
              ) : (
                <span>
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                    {restaurant.website}
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>🆔 Información Técnica</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>ID del Cliente:</label>
              <span className="technical-info">{restaurant.clientId}</span>
            </div>
            <div className="detail-item">
              <label>Estado:</label>
              <span className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
                {restaurant.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
              </span>
            </div>
            <div className="detail-item">
              <label>Creado:</label>
              <span className="technical-info">
                {new Date(restaurant.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="detail-item">
              <label>Actualizado:</label>
              <span className="technical-info">
                {new Date(restaurant.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
