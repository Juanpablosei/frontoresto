import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useRestaurantStore } from '../store/restaurantStore';
import { mockUsers, getTranslatedUserName } from '../mock/users';
import { useTranslation } from '../hooks/useTranslation';
import { 
  DashboardHeader, 
  UserList, 
  RestaurantList 
} from '../components/dashboard';

const UnifiedDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, hasRole } = useAuthStore();
  const { restaurants, getRestaurantsByOwner } = useRestaurantStore();
  const { t } = useTranslation();

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
    const userRestaurants = getRestaurantsByOwner(selectedUser.id);
    
    if (userRestaurants.length === 1) {
      // Si solo tiene un restaurante, navegar directamente
      navigate(`/restaurants/${userRestaurants[0].id}`);
    } else if (userRestaurants.length > 1) {
      // Si tiene múltiples restaurantes, mostrar lista
      setSelectedUser(selectedUser);
      setUserRestaurants(userRestaurants);
      setShowingUserRestaurants(true);
      setShowUsers(false);
    }
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

  const handleCreateRestaurant = () => {
    navigate('/create-restaurant');
  };

  const handleShowRestaurants = () => {
    if (isAdmin) {
      // Si es admin y está viendo usuarios, cambiar a ver sus propios restaurantes
      setShowUsers(false);
      setShowRestaurants(true);
      setShowingUserRestaurants(false);
      setSelectedUser(null);
      setUserRestaurants([]);
    } else if (isOwner) {
      // Si es owner, simplemente mostrar restaurantes
      setShowRestaurants(true);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Resetear a la primera página cuando se busca
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

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <DashboardHeader
        onBackToUsers={handleHideUsers}
        onShowRestaurants={() => setShowRestaurants(true)}
        onCreateRestaurant={handleCreateRestaurant}
        isAdmin={isAdmin}
        isOwner={isOwner}
        showUsers={showUsers}
        showRestaurants={showRestaurants}
        showingUserRestaurants={showingUserRestaurants}
        selectedUser={selectedUser}
      />

      <main className="flex-1 p-8 lg:p-8 max-w-6xl mx-auto w-full">
        {/* Vista de Admin - Lista de Usuarios */}
        {isAdmin && showUsers && (
          <UserList
            users={ownerUsers}
            filteredUsers={filteredUsers}
            currentUsers={currentUsers}
            searchTerm={searchTerm}
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            onUserSelect={handleUserSelect}
            onSearch={handleSearch}
            onPageChange={handlePageChange}
          />
        )}

        {/* Vista de Admin - Restaurantes de un usuario específico */}
        {isAdmin && showingUserRestaurants && (
          <RestaurantList
            restaurants={userRestaurants}
            onCreateRestaurant={handleCreateRestaurant}
            onRestaurantSelect={handleRestaurantSelect}
          />
        )}

        {/* Vista de Owner - Lista de Restaurantes */}
        {isOwner && showRestaurants && (
          <RestaurantList
            restaurants={currentRestaurants}
            onCreateRestaurant={handleCreateRestaurant}
            onRestaurantSelect={handleRestaurantSelect}
          />
        )}
      </main>
    </div>
  );
};

export default UnifiedDashboard;
