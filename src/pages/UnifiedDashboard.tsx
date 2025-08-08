import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useRestaurantStore } from '../store/restaurantStore';
import { UserInfo } from '../components/auth';
import { mockUsers } from '../mock/users';
import { useThemeColors } from '../hooks/useThemeColors';

const UnifiedDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, hasRole, hasAnyRole } = useAuthStore();
  const { restaurants, getRestaurantsByOwner, getEmployeesByRestaurant } = useRestaurantStore();
  const { 
    getBackgroundGradient, 
    getCardBackground, 
    getCardBorder, 
    getTextColor 
  } = useThemeColors();

  // Estados para manejar la vista
  const [showUsers, setShowUsers] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userRestaurants, setUserRestaurants] = useState<any[]>([]);
  const [showingUserRestaurants, setShowingUserRestaurants] = useState(false);

  // Determinar si es admin u owner
  const isAdmin = hasRole('ADMIN');
  const isOwner = hasRole('CLIENT_OWNER');

  // Obtener restaurantes según el tipo de usuario
  const getCurrentRestaurants = () => {
    if (isOwner && user) {
      return restaurants.filter(restaurant => restaurant.ownerId === user.id);
    }
    return restaurants;
  };

  const currentRestaurants = getCurrentRestaurants();

  // Configurar vista inicial según el tipo de usuario
  useEffect(() => {
    if (isAdmin) {
      setShowUsers(true);
      setShowRestaurants(false);
    } else if (isOwner) {
      setShowUsers(false);
      setShowRestaurants(true);
    }
  }, [isAdmin, isOwner]);

  const handleUserSelect = (selectedUser: any) => {
    console.log('=== DEBUG handleUserSelect ===');
    console.log('Usuario clickeado:', selectedUser);
    console.log('ID del usuario:', selectedUser.id);
    
    const userRestaurants = getRestaurantsByOwner(selectedUser.id);
    console.log('Restaurantes encontrados para', selectedUser.name, ':', userRestaurants);
    console.log('Cantidad de restaurantes:', userRestaurants.length);
    console.log('Todos los restaurantes disponibles:', restaurants);
    console.log('Todos los propietarios disponibles:', mockUsers);
    console.log('Probando getRestaurantsByOwner con diferentes IDs:');
    console.log('user-002:', getRestaurantsByOwner('user-002'));
    console.log('user-003:', getRestaurantsByOwner('user-003'));
    console.log('user-007:', getRestaurantsByOwner('user-007'));
    
    if (userRestaurants.length === 1) {
      // Si solo tiene un restaurante, navegar directamente
      console.log('Navegando directamente al restaurante único');
      navigate(`/restaurants/${userRestaurants[0].id}`);
    } else if (userRestaurants.length > 1) {
      // Si tiene múltiples restaurantes, mostrar lista
      console.log('Mostrando lista de restaurantes múltiples');
      setSelectedUser(selectedUser);
      setUserRestaurants(userRestaurants);
      setShowingUserRestaurants(true);
      setShowUsers(false);
    }
    console.log('=== FIN DEBUG ===');
  };

  const handleHideUsers = () => {
    setShowUsers(true);
    setShowingUserRestaurants(false);
    setSelectedUser(null);
    setUserRestaurants([]);
  };

  const handleRestaurantSelect = (restaurantId: string) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  // Filtrar solo usuarios CLIENT_OWNER para mostrar al admin
  const ownerUsers = mockUsers.filter(user => user.role === 'CLIENT_OWNER');

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: getBackgroundGradient() }}
    >
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-6 lg:p-8 bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-6xl mx-auto">
            <UserInfo />
          </div>
        </header>

        <main className="flex-1 p-8 lg:p-8 max-w-6xl mx-auto w-full">
          {/* Botón para salir de la vista de usuario (solo para admin) */}
          {isAdmin && selectedUser && (
            <div className="mb-6">
              <button
                onClick={handleHideUsers}
                className="px-4 py-2 backdrop-blur-lg rounded-lg border text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: getCardBackground(),
                  borderColor: getCardBorder(),
                  color: getTextColor(900),
                }}
              >
                ← Volver a Usuarios
              </button>
            </div>
          )}

          {/* Vista de Admin - Lista de Usuarios */}
          {isAdmin && showUsers && (
            <div>
              <h2 
                className="text-3xl lg:text-4xl font-semibold text-center mb-8 shadow-lg"
                style={{ color: getTextColor(900) }}
              >
                👥 Gestión de Usuarios
              </h2>
              
              <div 
                className="backdrop-blur-lg rounded-2xl p-8 border"
                style={{
                  backgroundColor: getCardBackground(),
                  borderColor: getCardBorder(),
                }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderColor: getCardBorder() }} className="border-b">
                        <th 
                          className="text-left p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          Nombre
                        </th>
                        <th 
                          className="text-left p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          Email
                        </th>
                        <th 
                          className="text-center p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          Restaurantes
                        </th>
                        <th 
                          className="text-center p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          Empleados
                        </th>
                        <th 
                          className="text-center p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ownerUsers.map((user) => {
                        const userRestaurants = getRestaurantsByOwner(user.id);
                        const totalEmployees = userRestaurants.reduce((total, restaurant) => {
                          const restaurantEmployees = getEmployeesByRestaurant(restaurant.id);
                          return total + restaurantEmployees.length;
                        }, 0);
                        
                        return (
                          <tr 
                            key={user.id} 
                            className="border-b transition-colors duration-200 cursor-pointer hover:bg-opacity-50"
                            style={{ 
                              borderColor: getCardBorder(),
                              backgroundColor: 'transparent'
                            }}
                            onClick={() => handleUserSelect(user)}
                          >
                            <td 
                              className="p-4 font-medium"
                              style={{ color: getTextColor(900) }}
                            >
                              {user.name}
                            </td>
                            <td 
                              className="p-4"
                              style={{ color: getTextColor(600) }}
                            >
                              {user.email}
                            </td>
                            <td 
                              className="p-4 text-center"
                              style={{ color: getTextColor(800) }}
                            >
                              {userRestaurants.length}
                            </td>
                            <td 
                              className="p-4 text-center"
                              style={{ color: getTextColor(800) }}
                            >
                              {totalEmployees}
                            </td>
                            <td className="p-4 text-center">
                              <button 
                                className="px-3 py-1 rounded-lg text-sm transition-colors duration-200"
                                style={{
                                  backgroundColor: getCardBackground(),
                                  borderColor: getCardBorder(),
                                  color: getTextColor(700),
                                }}
                              >
                                Ver Detalles
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Vista de Admin - Restaurantes del Usuario Seleccionado */}
          {isAdmin && showingUserRestaurants && selectedUser && (
            <div>
              <h2 
                className="text-3xl lg:text-4xl font-semibold text-center mb-8 shadow-lg"
                style={{ color: getTextColor(900) }}
              >
                🏪 Restaurantes de {selectedUser.name}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRestaurants.map((restaurant) => {
                  const restaurantEmployees = getEmployeesByRestaurant(restaurant.id);
                  return (
                    <div
                      key={restaurant.id}
                      className="backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                      style={{
                        backgroundColor: getCardBackground(),
                        borderColor: getCardBorder(),
                      }}
                      onClick={() => handleRestaurantSelect(restaurant.id)}
                    >
                      <div className="text-4xl mb-4">🏪</div>
                      <h3 
                        className="text-xl font-semibold mb-2"
                        style={{ color: getTextColor(900) }}
                      >
                        {restaurant.name}
                      </h3>
                      <p 
                        className="text-sm mb-4"
                        style={{ color: getTextColor(600) }}
                      >
                        {restaurant.description}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span style={{ color: getTextColor(600) }}>📍 {restaurant.address}</span>
                        <span style={{ color: getTextColor(600) }}>👥 {restaurantEmployees.length} empleados</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Vista de Owner - Mis Restaurantes */}
          {isOwner && showRestaurants && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 
                  className="text-3xl lg:text-4xl font-semibold shadow-lg"
                  style={{ color: 'white' }}
                >
                  🏪 Mis Restaurantes
                </h2>
                <button
                  onClick={() => navigate('/create-restaurant')}
                  className="px-6 py-3 backdrop-blur-lg rounded-lg border font-medium transition-all duration-200"
                  style={{
                    backgroundColor: getCardBackground(),
                    borderColor: getCardBorder(),
                    color: getTextColor(900),
                  }}
                >
                  ➕ Crear Restaurante
                </button>
              </div>
              
              {currentRestaurants.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🏪</div>
                  <h3 
                    className="text-2xl font-semibold mb-4"
                    style={{ color: getTextColor(900) }}
                  >
                    No tienes restaurantes aún
                  </h3>
                  <p 
                    className="mb-8"
                    style={{ color: getTextColor(600) }}
                  >
                    Comienza creando tu primer restaurante
                  </p>
                  <button
                    onClick={() => navigate('/create-restaurant')}
                    className="px-8 py-4 backdrop-blur-lg rounded-lg border font-medium text-lg transition-all duration-200"
                    style={{
                      backgroundColor: getCardBackground(),
                      borderColor: getCardBorder(),
                      color: getTextColor(900),
                    }}
                  >
                    🚀 Crear Mi Primer Restaurante
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentRestaurants.map((restaurant) => {
                    const restaurantEmployees = getEmployeesByRestaurant(restaurant.id);
                    return (
                      <div
                        key={restaurant.id}
                        className="backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                        style={{
                          backgroundColor: getCardBackground(),
                          borderColor: getCardBorder(),
                        }}
                        onClick={() => handleRestaurantSelect(restaurant.id)}
                      >
                        <div className="text-4xl mb-4">🏪</div>
                        <h3 
                          className="text-xl font-semibold mb-2"
                          style={{ color: getTextColor(900) }}
                        >
                          {restaurant.name}
                        </h3>
                        <p 
                          className="text-sm mb-4"
                          style={{ color: getTextColor(600) }}
                        >
                          {restaurant.description}
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span style={{ color: getTextColor(600) }}>📍 {restaurant.address}</span>
                          <span style={{ color: getTextColor(600) }}>👥 {restaurantEmployees.length} empleados</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UnifiedDashboard;
