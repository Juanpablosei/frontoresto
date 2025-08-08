import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { useRestaurantStore, Employee } from '../store/restaurantStore';
import { mockUsers, MockUser } from '../mock/users';
import UserInfo from '../components/auth/UserInfo';
import EmployeeTransferModal from '../components/restaurant/EmployeeTransferModal';
import './Restaurants.css';

interface EditRestaurantData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

const UnifiedDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasRole } = useAuthStore();
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedEmployeeForTransfer, setSelectedEmployeeForTransfer] = useState<Employee | null>(null);
  const [showUsers, setShowUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [userRestaurants, setUserRestaurants] = useState<any[]>([]);
  const [showingUserRestaurants, setShowingUserRestaurants] = useState(false);
  const [impersonatedUser, setImpersonatedUser] = useState<MockUser | null>(null);
  
  // Usar el store de Zustand
  const {
    restaurants,
    showRestaurants,
    editingRestaurant,
    showEmployees,
    selectedRestaurantEmployees,
    selectedRestaurantForEmployees,
    setShowRestaurants,
    setShowEmployees,
    setSelectedRestaurantEmployees,
    setSelectedRestaurantForEmployees,
    setEditingRestaurant,
    updateRestaurant,
    getEmployeesByRestaurant,
    getRestaurantsByOwner,
    getRestaurantById
  } = useRestaurantStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<EditRestaurantData>();

  // Determinar permisos basados en el rol y contexto actual
  const isAdmin = hasRole('ADMIN');
  const isOwner = hasRole('CLIENT_OWNER');
  
  // Debug: mostrar información del usuario y roles
  console.log('Usuario actual:', user);
  console.log('Roles detectados:', { isAdmin, isOwner });
  
  // Obtener restaurantes según el contexto actual
  const getCurrentRestaurants = () => {
    if (isAdmin && impersonatedUser) {
      // Si es admin impersonando a un usuario, mostrar los restaurantes de ese usuario
      return getRestaurantsByOwner(impersonatedUser.id);
    } else if (isOwner && user) {
      // Si es owner, mostrar solo sus restaurantes
      return getRestaurantsByOwner(user.id);
    }
    // Si es admin sin impersonación, mostrar todos los restaurantes
    return restaurants;
  };

  const currentRestaurants = getCurrentRestaurants();

  // Efecto para mostrar usuarios automáticamente si es admin
  useEffect(() => {
    console.log('useEffect ejecutándose:', { isAdmin, isOwner });
    
    if (isAdmin) {
      console.log('Configurando vista de admin - mostrando usuarios');
      setShowUsers(true);
      setShowRestaurants(false);
      setSelectedUser(null);
      setUserRestaurants([]);
      setShowingUserRestaurants(false);
    } else if (isOwner) {
      console.log('Configurando vista de owner - mostrando restaurantes');
      setShowRestaurants(true);
      setShowUsers(false);
    }
  }, [isAdmin, isOwner]);

  const handleRestaurantSelect = (restaurant: any) => {
    // Si es admin impersonando, navegar al panel de administración del restaurante
    if (isAdmin && impersonatedUser) {
      console.log('Admin navegando a panel de restaurante:', restaurant.name);
      navigate(`/restaurants/${restaurant.id}`);
    } else {
      // Comportamiento normal para owners
      navigate(`/restaurants/${restaurant.id}`);
    }
  };

  const handleShowRestaurants = () => {
    setShowRestaurants(true);
  };

  const handleHideRestaurants = () => {
    setShowRestaurants(false);
    setEditingRestaurant(null);
  };

  const handleShowEmployees = (restaurant: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRestaurantForEmployees(restaurant);
    
    // Obtener empleados del restaurante desde el store
    const restaurantEmployees = getEmployeesByRestaurant(restaurant.id);
    setSelectedRestaurantEmployees(restaurantEmployees);
    setShowEmployees(true);
  };

  const handleHideEmployees = () => {
    setShowEmployees(false);
    setSelectedRestaurantForEmployees(null);
    setSelectedRestaurantEmployees([]);
  };

  const handleEditRestaurant = (restaurant: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRestaurant(restaurant);
    setValue('name', restaurant.name);
    setValue('description', restaurant.description);
    setValue('address', restaurant.address);
    setValue('phone', restaurant.phone);
    setValue('email', restaurant.email);
    setValue('website', restaurant.website);
  };

  const handleCancelEdit = () => {
    setEditingRestaurant(null);
    reset();
  };

  const onSubmitEdit = (data: EditRestaurantData) => {
    if (editingRestaurant) {
      updateRestaurant(editingRestaurant.id, data);
      setEditingRestaurant(null);
      reset();
    }
  };

  const handleTransferEmployee = (employee: Employee, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEmployeeForTransfer(employee);
    setTransferModalOpen(true);
  };

  const handleCloseTransferModal = () => {
    setTransferModalOpen(false);
    setSelectedEmployeeForTransfer(null);
  };

  // Funciones para manejar usuarios (solo para admin)
  const handleShowUsers = () => {
    setShowUsers(true);
    setShowRestaurants(false);
    setSelectedUser(null);
    setUserRestaurants([]);
    setShowingUserRestaurants(false);
  };

  const handleHideUsers = () => {
    setShowUsers(false);
    setSelectedUser(null);
    setUserRestaurants([]);
    setShowingUserRestaurants(false);
  };

  const handleUserSelect = (user: MockUser) => {
    console.log('=== DEBUG handleUserSelect ===');
    console.log('Usuario clickeado:', user);
    console.log('ID del usuario:', user.id);
    
    // Si es admin, activar impersonación
    if (isAdmin) {
      console.log('Admin activando impersonación para:', user.name);
      setImpersonatedUser(user);
      setShowUsers(false);
      setShowRestaurants(true);
      return;
    }
    
    // Obtener restaurantes del usuario
    const userRestaurantsList = getRestaurantsByOwner(user.id);
    console.log('Restaurantes encontrados para', user.name, ':', userRestaurantsList);
    console.log('Cantidad de restaurantes:', userRestaurantsList.length);
    
    // Debug: mostrar todos los restaurantes disponibles
    console.log('Todos los restaurantes disponibles:', restaurants);
    console.log('Todos los propietarios disponibles:', mockUsers.filter(u => u.role === 'CLIENT_OWNER'));
    
    // Debug: verificar si la función getRestaurantsByOwner está funcionando
    console.log('Probando getRestaurantsByOwner con diferentes IDs:');
    console.log('user-002:', getRestaurantsByOwner('user-002'));
    console.log('user-003:', getRestaurantsByOwner('user-003'));
    console.log('user-007:', getRestaurantsByOwner('user-007'));
    
    if (userRestaurantsList.length === 1) {
      // Si solo tiene un restaurante, ir directamente a ese restaurante
      console.log('Navegando a restaurante único:', userRestaurantsList[0]);
      navigate(`/restaurants/${userRestaurantsList[0].id}`);
    } else if (userRestaurantsList.length > 1) {
      // Si tiene múltiples restaurantes, mostrar la lista para elegir
      console.log('Mostrando lista de restaurantes múltiples');
      setSelectedUser(user);
      setUserRestaurants(userRestaurantsList);
      setShowingUserRestaurants(true);
    } else {
      // Si no tiene restaurantes, mostrar mensaje o manejar según necesidad
      console.log('Usuario sin restaurantes asignados');
      alert(`${user.name} no tiene restaurantes asignados.`);
    }
    console.log('=== FIN DEBUG ===');
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
    setUserRestaurants([]);
    setShowingUserRestaurants(false);
  };

  const handleExitImpersonation = () => {
    setImpersonatedUser(null);
    setShowUsers(true);
    setShowRestaurants(false);
  };

  return (
    <div className="restaurants-container">
      <div className="restaurants-header">
        <div className="header-content">
          <div className="header-info">
            <h1>
              {isAdmin 
                ? impersonatedUser 
                  ? `👑 Admin - Vista de ${impersonatedUser.name}`
                  : '👑 Panel de Administración' 
                : '🏪 Mis Restaurantes'
              }
            </h1>
            <p>
              {isAdmin 
                ? impersonatedUser
                  ? `Administrando restaurantes de ${impersonatedUser.name}`
                  : 'Gestiona propietarios y sus restaurantes del sistema'
                : 'Administra tus restaurantes y empleados'
              }
            </p>
          </div>
          <div className="header-actions">
            <UserInfo />
          </div>
        </div>
      </div>

      <div className="restaurants-content">
        {/* Contenido principal */}
        <div className="main-content">
          {/* Vista de usuarios para admin */}
          {showUsers && isAdmin && (
            <div className="users-section">
              <div className="section-header">
                <h2>👥 Propietarios del Sistema</h2>
                <button
                  className="close-section-btn"
                  onClick={handleHideUsers}
                >
                  ✕
                </button>
              </div>

              {!showingUserRestaurants ? (
                <div className="users-table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>👤 Usuario</th>
                        <th>📧 Email</th>
                        <th>🏪 Restaurantes</th>
                        <th>👥 Empleados</th>
                        <th>📊 Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.filter(user => user.role === 'CLIENT_OWNER').map((user) => {
                        const userRestaurants = getRestaurantsByOwner(user.id);
                        const totalEmployees = userRestaurants.reduce((total, restaurant) => {
                          const restaurantEmployees = getEmployeesByRestaurant(restaurant.id);
                          return total + restaurantEmployees.length;
                        }, 0);
                        
                        return (
                          <tr 
                            key={user.id} 
                            className="user-row"
                            onClick={() => handleUserSelect(user)}
                          >
                            <td className="user-name-cell">
                              <div className="user-name-info">
                                <span className="user-name">{user.name}</span>
                              </div>
                            </td>
                            <td className="user-email">{user.email}</td>
                            <td className="restaurants-count">
                              <span className="count-badge">{userRestaurants.length}</span>
                            </td>
                            <td className="employees-count">
                              <span className="count-badge">{totalEmployees}</span>
                            </td>
                            <td className="user-actions">
                              <button className="view-btn">
                                🏪 Ver Restaurantes
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="user-restaurants-section">
                  <div className="section-header">
                    <button
                      className="back-btn"
                      onClick={handleBackToUsers}
                    >
                      ← Volver a Usuarios
                    </button>
                    <h2>🏪 Restaurantes de {selectedUser?.name || 'Usuario'}</h2>
                    <button
                      className="close-section-btn"
                      onClick={handleHideUsers}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="restaurants-grid">
                    {userRestaurants.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="restaurant-card"
                        onClick={() => handleRestaurantSelect(restaurant)}
                      >
                        <div className="restaurant-header">
                          <div className="restaurant-icon">
                            <span className="icon">🏪</span>
                          </div>
                          <div className="restaurant-info">
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                            <p className="restaurant-description">{restaurant.description}</p>
                          </div>
                          <div className="restaurant-status">
                            <span className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
                              {restaurant.isOpen ? 'Abierto' : 'Cerrado'}
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
                        </div>

                        <div className="restaurant-actions">
                          <button
                            className="action-btn employees-btn"
                            onClick={(e) => handleShowEmployees(restaurant, e)}
                          >
                            👥 Empleados
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {showRestaurants && (
            <div className="restaurants-section">
              {isAdmin && impersonatedUser && (
                <div className="exit-impersonation-container">
                  <button
                    className="exit-impersonation-btn-sober"
                    onClick={handleExitImpersonation}
                  >
                    ← Volver a Propietarios
                  </button>
                </div>
              )}
              <div className="section-header">
                <h2>
                  {isAdmin 
                    ? impersonatedUser
                      ? `🏪 Restaurantes de ${impersonatedUser.name}`
                      : 'Clientes del Sistema' 
                    : 'Mis Restaurantes'
                  }
                </h2>
                <button
                  className="close-section-btn"
                  onClick={handleHideRestaurants}
                >
                  ✕
                </button>
              </div>

              <div className="restaurants-grid">
                {currentRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="restaurant-card"
                    onClick={() => handleRestaurantSelect(restaurant)}
                  >
                    <div className="restaurant-header">
                      <div className="restaurant-icon">
                        <span className="icon">🏪</span>
                      </div>
                      <div className="restaurant-info">
                        <h3 className="restaurant-name">{restaurant.name}</h3>
                        <p className="restaurant-description">{restaurant.description}</p>
                      </div>
                      <div className="restaurant-status">
                        <span className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`}>
                          {restaurant.isOpen ? 'Abierto' : 'Cerrado'}
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
                    </div>

                    <div className="restaurant-actions">
                      <button
                        className="action-btn employees-btn"
                        onClick={(e) => handleShowEmployees(restaurant, e)}
                      >
                        👥 Empleados
                      </button>
                      
                      {isOwner && (
                        <button
                          className="action-btn edit-btn"
                          onClick={(e) => handleEditRestaurant(restaurant, e)}
                        >
                          ✏️ Editar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          

          {showEmployees && selectedRestaurantForEmployees && (
            <div className="employees-section">
              <div className="section-header">
                <h2>
                  👥 Empleados de {selectedRestaurantForEmployees.name}
                </h2>
                <button
                  className="close-section-btn"
                  onClick={handleHideEmployees}
                >
                  ✕
                </button>
              </div>

              <div className="employees-grid">
                {selectedRestaurantEmployees.map((employee) => (
                  <div key={employee.id} className="employee-card">
                    <div className="employee-header">
                      <div className="employee-avatar">
                        <span className="avatar-icon">👤</span>
                      </div>
                      <div className="employee-info">
                        <h3 className="employee-name">{employee.name}</h3>
                        <span className="employee-role">{employee.role}</span>
                      </div>
                      <div className="employee-status">
                        <span className={`status-badge ${employee.isActive ? 'active' : 'inactive'}`}>
                          {employee.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>

                    <div className="employee-details">
                      <div className="detail-item">
                        <span className="detail-label">📧 Email:</span>
                        <span className="detail-value">{employee.email}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">📞 Teléfono:</span>
                        <span className="detail-value">{employee.phone}</span>
                      </div>
                    </div>

                    <div className="employee-actions">
                      <button
                        className="action-btn transfer-btn"
                        onClick={(e) => handleTransferEmployee(employee, e)}
                      >
                        🔄 Transferir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal de edición de restaurante */}
          {editingRestaurant && (
            <div className="edit-modal-overlay">
              <div className="edit-modal">
                <div className="modal-header">
                  <h3>✏️ Editar Restaurante</h3>
                  <button className="close-btn" onClick={handleCancelEdit}>
                    ✕
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmitEdit)} className="edit-form">
                  <div className="form-group">
                    <label>Nombre del Restaurante</label>
                    <input
                      type="text"
                      {...register('name', { required: 'El nombre es requerido' })}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                  </div>

                  <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                      {...register('description', { required: 'La descripción es requerida' })}
                      className={errors.description ? 'error' : ''}
                    />
                    {errors.description && <span className="error-message">{errors.description.message}</span>}
                  </div>

                  <div className="form-group">
                    <label>Dirección</label>
                    <input
                      type="text"
                      {...register('address', { required: 'La dirección es requerida' })}
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-message">{errors.address.message}</span>}
                  </div>

                  <div className="form-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'El teléfono es requerido' })}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      {...register('email', { required: 'El email es requerido' })}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                  </div>

                  <div className="form-group">
                    <label>Sitio Web</label>
                    <input
                      type="url"
                      {...register('website')}
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                      Cancelar
                    </button>
                    <button type="submit" className="save-btn">
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de transferencia de empleados */}
      {transferModalOpen && selectedEmployeeForTransfer && (
        <EmployeeTransferModal
          isOpen={transferModalOpen}
          onClose={handleCloseTransferModal}
          employee={selectedEmployeeForTransfer}
        />
      )}
    </div>
  );
};

export default UnifiedDashboard;
