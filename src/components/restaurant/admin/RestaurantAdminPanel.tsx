import React, { useState, useEffect } from 'react';
import { Restaurant, AdminPanelState } from './types';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import RestaurantActions from './RestaurantActions';
import './RestaurantAdminPanel.css';

const RestaurantAdminPanel: React.FC = () => {
  const [state, setState] = useState<AdminPanelState>({
    selectedRestaurant: null,
    isEditing: false,
    isLoading: false,
    error: null
  });

  // Simular datos de ejemplo
  useEffect(() => {
    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'Restaurante El Buen Sabor',
        description: 'Restaurante especializado en comida tradicional',
        address: 'Calle Principal 123, Ciudad',
        phone: '+1 234 567 8900',
        email: 'info@restaurante.com',
        website: 'https://www.restaurante.com',
        clientId: '123e4567-e89b-12d3-a456-426614174000',
        isOpen: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Pizzeria La Italiana',
        description: 'Las mejores pizzas de la ciudad',
        address: 'Avenida Central 456, Ciudad',
        phone: '+1 234 567 8901',
        email: 'info@pizzeria.com',
        website: 'https://www.pizzeria.com',
        clientId: '123e4567-e89b-12d3-a456-426614174001',
        isOpen: false,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z'
      }
    ];

    setState(prev => ({
      ...prev,
      restaurants: mockRestaurants
    }));
  }, []);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setState(prev => ({
      ...prev,
      selectedRestaurant: restaurant,
      isLoading: true
    }));

    // Simular carga de datos del restaurante seleccionado
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isLoading: false
      }));
    }, 1000);
  };

  const handleRestaurantUpdate = async (restaurantId: string, data: Partial<Restaurant>) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Aquí iría la llamada real a la API
      console.log('Actualizando restaurante:', restaurantId, data);
      
      // Simular actualización
      setState(prev => ({
        ...prev,
        selectedRestaurant: prev.selectedRestaurant?.id === restaurantId 
          ? { ...prev.selectedRestaurant, ...data }
          : prev.selectedRestaurant,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error al actualizar el restaurante',
        isLoading: false
      }));
    }
  };

  const handleRestaurantToggle = async (restaurantId: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Aquí iría la llamada real a la API
      console.log('Cambiando estado del restaurante:', restaurantId);
      
      setState(prev => ({
        ...prev,
        selectedRestaurant: prev.selectedRestaurant?.id === restaurantId 
          ? { ...prev.selectedRestaurant, isOpen: !prev.selectedRestaurant.isOpen }
          : prev.selectedRestaurant,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error al cambiar el estado del restaurante',
        isLoading: false
      }));
    }
  };

  const handleCreateRestaurant = async (data: any) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Aquí iría la llamada real a la API
      console.log('Creando restaurante:', data);
      
      const newRestaurant: Restaurant = {
        id: Date.now().toString(),
        ...data,
        isOpen: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setState(prev => ({
        ...prev,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error al crear el restaurante',
        isLoading: false
      }));
    }
  };

  return (
    <div className="restaurant-admin-panel">
      <div className="admin-header">
        <h1>🏪 Panel Administrativo de Restaurantes</h1>
        <p>Gestiona todos tus restaurantes desde un solo lugar</p>
      </div>

      {state.error && (
        <div className="admin-error">
          <span className="error-icon">⚠️</span>
          {state.error}
        </div>
      )}

      <div className="admin-content">
        <div className="admin-sidebar">
          <RestaurantList
            restaurants={[]}
            selectedRestaurant={state.selectedRestaurant}
            onRestaurantSelect={handleRestaurantSelect}
            onCreateRestaurant={handleCreateRestaurant}
            isLoading={state.isLoading}
          />
        </div>

        <div className="admin-main">
          {state.selectedRestaurant ? (
            <>
              <RestaurantDetails
                restaurant={state.selectedRestaurant}
                onUpdate={handleRestaurantUpdate}
                isLoading={state.isLoading}
              />
              <RestaurantActions
                restaurant={state.selectedRestaurant}
                onToggleStatus={handleRestaurantToggle}
                isLoading={state.isLoading}
              />
            </>
          ) : (
            <div className="admin-placeholder">
              <div className="placeholder-icon">🏪</div>
              <h2>Selecciona un Restaurante</h2>
              <p>Elige un restaurante de la lista para ver sus detalles y gestionarlo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantAdminPanel;
