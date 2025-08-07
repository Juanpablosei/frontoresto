import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../buttons';
import OwnersList from './OwnersList';
import OwnerDetails from './OwnerDetails';
import EmployeeList from './EmployeeList';
import { AdminPanelProps, Owner, Restaurant } from './types';
import { mockOwners } from '../../mock/adminData';
import { useAuthStore } from '../../store/authStore';
import UserInfo from '../auth/UserInfo';
import './AdminPanel.css';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOwners(mockOwners);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleOwnerSelect = (owner: Owner) => {
    setSelectedOwner(owner);
    setSelectedRestaurant(null);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBackToOwners = () => {
    setSelectedOwner(null);
    setSelectedRestaurant(null);
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    if (onLogout) onLogout();
  };

  if (isLoading) {
    return (
      <div className="admin-panel">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando datos de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="header-content">
          <div className="header-info">
            <h1>👑 Panel de Administración</h1>
            <p>Gestiona propietarios, restaurantes y empleados del sistema</p>
          </div>
          <div className="header-actions">
            <UserInfo />
          </div>
        </div>
      </div>

      <div className="admin-content">
        {!selectedOwner ? (
          <OwnersList
            owners={owners}
            onOwnerSelect={handleOwnerSelect}
            selectedOwner={selectedOwner}
          />
        ) : !selectedRestaurant ? (
          <OwnerDetails
            owner={selectedOwner}
            onRestaurantSelect={handleRestaurantSelect}
            selectedRestaurant={selectedRestaurant}
          />
        ) : (
          <EmployeeList
            employees={selectedRestaurant.employees}
            restaurantName={selectedRestaurant.name}
            onBack={handleBackToRestaurants}
          />
        )}
      </div>

      <div className="breadcrumb-nav">
        <button
          className={`breadcrumb-item ${!selectedOwner ? 'active' : ''}`}
          onClick={handleBackToOwners}
        >
          👥 Propietarios
        </button>
        {selectedOwner && (
          <>
            <span className="breadcrumb-separator">→</span>
            <button
              className={`breadcrumb-item ${selectedOwner && !selectedRestaurant ? 'active' : ''}`}
              onClick={() => setSelectedRestaurant(null)}
            >
              🏪 {selectedOwner.name}
            </button>
          </>
        )}
        {selectedRestaurant && (
          <>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-item active">
              👥 {selectedRestaurant.name}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
