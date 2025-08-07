import React, { useState } from 'react';
import { useRestaurantStore, Employee } from '../../store/restaurantStore';
import './EmployeeTransferModal.css';

interface EmployeeTransferModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeTransferModal: React.FC<EmployeeTransferModalProps> = ({
  employee,
  isOpen,
  onClose
}) => {
  const { restaurants, moveEmployee } = useRestaurantStore();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  const [isTransferring, setIsTransferring] = useState(false);

  // Filtrar restaurantes disponibles (excluir el actual)
  const availableRestaurants = restaurants.filter(
    restaurant => restaurant.id !== employee.restaurantId
  );

  const currentRestaurant = restaurants.find(
    restaurant => restaurant.id === employee.restaurantId
  );

  const handleTransfer = async () => {
    if (!selectedRestaurantId) return;

    setIsTransferring(true);
    
    try {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mover el empleado usando el store
      moveEmployee(employee.id, selectedRestaurantId);
      
      // Cerrar el modal
      onClose();
      setSelectedRestaurantId('');
    } catch (error) {
      console.error('Error al transferir empleado:', error);
    } finally {
      setIsTransferring(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="employee-transfer-overlay">
      <div className="employee-transfer-container">
        <div className="employee-transfer-header">
          <h2>🔄 Transferir Empleado</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="employee-transfer-content">
          <div className="employee-info">
            <div className="employee-avatar">
              <span className="avatar-icon">👤</span>
            </div>
            <div className="employee-details">
              <h3>{employee.name}</h3>
              <p className="employee-role">{employee.role}</p>
              <p className="current-restaurant">
                Actualmente en: <strong>{currentRestaurant?.name}</strong>
              </p>
            </div>
          </div>

          <div className="transfer-section">
            <h4>Seleccionar Nuevo Restaurante</h4>
            <div className="restaurants-list">
              {availableRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className={`restaurant-option ${
                    selectedRestaurantId === restaurant.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedRestaurantId(restaurant.id)}
                >
                  <div className="restaurant-info">
                    <span className="restaurant-icon">🏪</span>
                    <div>
                      <h5>{restaurant.name}</h5>
                      <p>{restaurant.address}</p>
                    </div>
                  </div>
                  <div className="selection-indicator">
                    {selectedRestaurantId === restaurant.id && '✓'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="transfer-actions">
            <button 
              className="cancel-btn" 
              onClick={onClose}
              disabled={isTransferring}
            >
              Cancelar
            </button>
            <button
              className="transfer-btn"
              onClick={handleTransfer}
              disabled={!selectedRestaurantId || isTransferring}
            >
              {isTransferring ? '🔄 Transfiriendo...' : '🔄 Transferir Empleado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTransferModal;
