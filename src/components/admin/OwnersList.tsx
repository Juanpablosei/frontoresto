import React from 'react';
import { Button } from '../buttons';
import { OwnersListProps } from './types';

const OwnersList: React.FC<OwnersListProps> = ({ owners, onOwnerSelect, selectedOwner }) => {
  return (
    <div className="owners-list">
      <div className="list-header">
        <h2>👥 Gestión de Propietarios</h2>
        <div className="header-stats">
          <span className="stat-item">
            <span className="stat-number">{owners.length}</span>
            <span className="stat-label">Propietarios</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">
              {owners.reduce((total, owner) => total + owner.restaurants.length, 0)}
            </span>
            <span className="stat-label">Restaurantes</span>
          </span>
        </div>
      </div>

      <div className="list-content">
        {owners.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No hay propietarios registrados</h3>
            <p>Los propietarios aparecerán aquí cuando se registren</p>
          </div>
        ) : (
          <div className="owners-grid">
            {owners.map((owner) => (
              <div
                key={owner.id}
                className={`owner-card ${selectedOwner?.id === owner.id ? 'selected' : ''} ${!owner.isActive ? 'inactive' : ''}`}
                onClick={() => onOwnerSelect(owner)}
              >
                <div className="owner-header">
                  <div className="owner-avatar">
                    <span className="avatar-icon">👤</span>
                  </div>
                  <div className="owner-info">
                    <h3 className="owner-name">{owner.name}</h3>
                    <span className={`status-badge ${owner.isActive ? 'active' : 'inactive'}`}>
                      {owner.isActive ? '🟢 Activo' : '🔴 Inactivo'}
                    </span>
                  </div>
                </div>

                <div className="owner-details">
                  <div className="detail-item">
                    <span className="detail-label">📧 Email:</span>
                    <span className="detail-value">{owner.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">📞 Teléfono:</span>
                    <span className="detail-value">{owner.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🏪 Restaurantes:</span>
                    <span className="detail-value">{owner.restaurants.length}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">📅 Registrado:</span>
                    <span className="detail-value">
                      {new Date(owner.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="owner-actions">
                                     <Button
                     variant="primary"
                     size="small"
                     onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                       e?.stopPropagation();
                       onOwnerSelect(owner);
                     }}
                   >
                    👁️ Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnersList;
