import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useRestaurantStore } from '../store/restaurantStore';
import { UserInfo } from '../components/auth';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageSelector } from '../components/language';
import { mockUsers, getTranslatedUserName } from '../mock/users';
import { useThemeColors } from '../hooks/useThemeColors';

const UnifiedDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, hasRole, hasAnyRole } = useAuthStore();
  const { restaurants, getRestaurantsByOwner, getEmployeesByRestaurant } = useRestaurantStore();
  const { t } = useTranslation();
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
  
  // Estados para búsqueda y paginación
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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
  
  // Filtrar usuarios por término de búsqueda
  const filteredUsers = ownerUsers.filter(user => 
    getTranslatedUserName(user, t).toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calcular paginación
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
  
  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Función para manejar búsqueda
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Resetear a la primera página cuando se busca
  };

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: getBackgroundGradient() }}
    >
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-6 lg:p-8 bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-6xl mx-auto grid grid-cols-3 items-center">
            <div></div>
            <div className="flex justify-center">
              <UserInfo />
            </div>
            <div className="flex justify-end">
              <LanguageSelector />
            </div>
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
                ← {t('dashboard.backToUsers')}
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
                👥 {t('dashboard.userManagement')}
              </h2>
              
              <div 
                className="backdrop-blur-lg rounded-2xl p-8 border"
                style={{
                  backgroundColor: getCardBackground(),
                  borderColor: getCardBorder(),
                }}
              >
                {/* Buscador */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('dashboard.searchUsers')}
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full px-4 py-3 pl-10 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        backgroundColor: getCardBackground(),
                        borderColor: getCardBorder(),
                        color: getTextColor(900),
                        boxShadow: '0 0 0 2px transparent',
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = `0 0 0 2px ${getCardBorder()}40`;
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 0 0 2px transparent';
                      }}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">🔍</span>
                    </div>
                  </div>
                </div>



                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderColor: getCardBorder() }} className="border-b">
                        <th 
                          className="text-left p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          {t('common.name')}
                        </th>
                        <th 
                          className="text-left p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          {t('common.email')}
                        </th>
                        <th 
                          className="text-center p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          {t('dashboard.restaurants')}
                        </th>
                        <th 
                          className="text-center p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          {t('dashboard.employees')}
                        </th>
                        <th 
                          className="text-center p-4 font-semibold"
                          style={{ color: getTextColor(700) }}
                        >
                          {t('dashboard.actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8" style={{ color: getTextColor(600) }}>
                            {t('dashboard.noUsersFound')}
                          </td>
                        </tr>
                      ) : (
                        currentUsers.map((user) => {
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
                              {getTranslatedUserName(user, t)}
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
                                {t('dashboard.viewDetails')}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-6 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: currentPage === 1 ? 'transparent' : getCardBackground(),
                        borderColor: getCardBorder(),
                        color: currentPage === 1 ? getTextColor(400) : getTextColor(700),
                      }}
                    >
                      {t('dashboard.previous')}
                    </button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            page === currentPage ? 'text-white' : ''
                          }`}
                          style={{
                            backgroundColor: page === currentPage ? getCardBorder() : 'transparent',
                            borderColor: getCardBorder(),
                            color: page === currentPage ? 'white' : getTextColor(700),
                          }}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: currentPage === totalPages ? 'transparent' : getCardBackground(),
                        borderColor: getCardBorder(),
                        color: currentPage === totalPages ? getTextColor(400) : getTextColor(700),
                      }}
                    >
                      {t('dashboard.next')}
                    </button>
                  </div>
                )}
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
                🏪 {t('dashboard.restaurantsOf')} {selectedUser.name}
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
                        <span style={{ color: getTextColor(600) }}>👥 {restaurantEmployees.length} {t('dashboard.totalEmployees')}</span>
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
                  🏪 {t('dashboard.myRestaurants')}
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
                  ➕ {t('dashboard.createRestaurant')}
                </button>
              </div>
              
              {currentRestaurants.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🏪</div>
                  <h3 
                    className="text-2xl font-semibold mb-4"
                    style={{ color: getTextColor(900) }}
                  >
                    {t('dashboard.noRestaurants')}
                  </h3>
                  <p 
                    className="mb-8"
                    style={{ color: getTextColor(600) }}
                  >
                    {t('dashboard.noRestaurantsDesc')}
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
                    🚀 {t('dashboard.createFirstRestaurant')}
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
                          <span style={{ color: getTextColor(600) }}>👥 {restaurantEmployees.length} {t('dashboard.totalEmployees')}</span>
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
