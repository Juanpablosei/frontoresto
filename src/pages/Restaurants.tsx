import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useRestaurantStore, Employee } from '../store/restaurantStore';
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

const Restaurants: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedEmployeeForTransfer, setSelectedEmployeeForTransfer] = useState<Employee | null>(null);
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  
  // Usar el store de Zustand
  const {
    restaurants,
    employees,
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
    getRestaurantById
  } = useRestaurantStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<EditRestaurantData>();

  const handleRestaurantSelect = (restaurant: any) => {
    navigate(`/restaurants/${restaurant.id}`);
  };



  const handleShowRestaurants = () => {
    setShowRestaurants(true);
    setShowAllEmployees(false);
  };

  const handleHideRestaurants = () => {
    setShowRestaurants(false);
    setEditingRestaurant(null);
  };

  const handleShowAllEmployees = () => {
    setShowAllEmployees(true);
    setShowRestaurants(false);
  };

  const handleHideAllEmployees = () => {
    setShowAllEmployees(false);
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
    // Refrescar la lista de empleados después de la transferencia
    if (selectedRestaurantForEmployees) {
      const updatedEmployees = getEmployeesByRestaurant(selectedRestaurantForEmployees.id);
      setSelectedRestaurantEmployees(updatedEmployees);
    }
  };

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <div className="header-content">
          <div className="header-info">
            <h1>🏪 Mis Restaurantes</h1>
            <p>Gestiona tus restaurantes y configuraciones</p>
          </div>
          <div className="header-actions">
            <UserInfo />
          </div>
        </div>
      </div>

      <div className="restaurants-content">
        <div className="quick-actions">
          <h3>Acciones Rápidas</h3>
          <div className="actions-grid">
            <button 
              className="action-btn"
              onClick={() => navigate('/restaurants/create')}
            >
              <span className="action-icon">➕</span>
              <span>Agregar Restaurante</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">👥</span>
              <span>Contratar Empleado</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">🍽️</span>
              <span>Crear Menú</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📊</span>
              <span>Ver Reportes</span>
            </button>
          </div>
        </div>

        {/* Sección de Lista de Restaurantes - Solo se muestra cuando showRestaurants es true */}
        {showRestaurants && (
          <div className="restaurants-section">
            <div className="section-header">
              <div className="header-actions-top">
                <button 
                  className="back-btn"
                  onClick={handleHideRestaurants}
                >
                  ← Volver al Dashboard
                </button>
              </div>
              <h2>📋 Mis Restaurantes ({restaurants.length})</h2>
              <p>Selecciona un restaurante para ver sus detalles</p>
            </div>

            {restaurants.length === 0 ? (
              <div className="empty-restaurants">
                <div className="empty-icon">🏪</div>
                <h3>No tienes restaurantes registrados</h3>
                <p>Crea tu primer restaurante para comenzar a gestionar tu negocio</p>
                <button 
                  className="create-first-btn"
                  onClick={() => navigate('/restaurants/create')}
                >
                  ➕ Crear Mi Primer Restaurante
                </button>
              </div>
            ) : (
              <div className="restaurants-grid">
                {restaurants.map((restaurant) => (
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
                        <span className="detail-label">📧 Email:</span>
                        <span className="detail-value">{restaurant.email}</span>
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
                      <button 
                        className="action-btn-small"
                        onClick={(e) => handleEditRestaurant(restaurant, e)}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        className="action-btn-small"
                        onClick={(e) => handleShowEmployees(restaurant, e)}
                      >
                        👥 Empleados
                      </button>
                      <button className="action-btn-small">
                        🍽️ Menús
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sección de Todos los Empleados - Solo se muestra cuando showAllEmployees es true */}
        {showAllEmployees && (
          <div className="employees-section">
            <div className="section-header">
              <div className="header-actions-top">
                <button 
                  className="back-btn"
                  onClick={handleHideAllEmployees}
                >
                  ← Volver al Dashboard
                </button>
              </div>
              <h2>👥 Todos los Empleados ({employees.length})</h2>
              <p>Gestiona todos los empleados de tus restaurantes</p>
            </div>

            {employees.length === 0 ? (
              <div className="empty-employees">
                <div className="empty-icon">👥</div>
                <h3>No hay empleados registrados</h3>
                <p>Contrata empleados para tus restaurantes</p>
              </div>
            ) : (
              <div className="employees-table-container">
                <table className="employees-table">
                  <thead>
                    <tr>
                      <th>Empleado</th>
                      <th>Rol</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Restaurante</th>
                      <th>Estado</th>
                      <th>Contratado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => {
                      const employeeRestaurant = getRestaurantById(employee.restaurantId);
                      return (
                        <tr key={employee.id} className="employee-row">
                          <td className="employee-cell">
                            <div className="employee-info-cell">
                              <div className="employee-avatar-small">
                                <span className="avatar-icon">👤</span>
                              </div>
                              <span className="employee-name">{employee.name}</span>
                            </div>
                          </td>
                          <td className="employee-cell">
                            <span className="role-badge-table">{employee.role}</span>
                          </td>
                          <td className="employee-cell">{employee.email}</td>
                          <td className="employee-cell">{employee.phone}</td>
                          <td className="employee-cell">
                            {employeeRestaurant?.name || 'Sin asignar'}
                          </td>
                          <td className="employee-cell">
                            <span className={`status-badge ${employee.isActive ? 'active' : 'inactive'}`}>
                              {employee.isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="employee-cell">
                            {new Date(employee.hireDate).toLocaleDateString()}
                          </td>
                          <td className="employee-cell">
                            <div className="table-actions">
                              <button className="action-btn-table" title="Editar empleado">✏️</button>
                              <button
                                className="action-btn-table"
                                onClick={(e) => handleTransferEmployee(employee, e)}
                                title="Transferir empleado"
                              >
                                🔄
                              </button>
                              <button className="action-btn-table" title="Ver perfil">📊</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Formulario de Edición - Solo se muestra cuando editingRestaurant no es null */}
        {editingRestaurant && (
          <div className="edit-form-overlay">
            <div className="edit-form-container">
              <form onSubmit={handleSubmit(onSubmitEdit)} className="edit-form">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    placeholder="Nombre del Restaurante *"
                    {...register('name', { 
                      required: 'El nombre es requerido',
                      minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
                    })}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <textarea
                    id="description"
                    placeholder="Descripción *"
                    {...register('description', { 
                      required: 'La descripción es requerida',
                      minLength: { value: 10, message: 'La descripción debe tener al menos 10 caracteres' }
                    })}
                    className={errors.description ? 'error' : ''}
                    rows={3}
                  />
                  {errors.description && <span className="error-message">{errors.description.message}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="address"
                    placeholder="Dirección *"
                    {...register('address', { 
                      required: 'La dirección es requerida',
                      minLength: { value: 10, message: 'La dirección debe tener al menos 10 caracteres' }
                    })}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address.message}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Teléfono *"
                    {...register('phone', { 
                      required: 'El teléfono es requerido',
                      pattern: { 
                        value: /^[\+]?[0-9\s\-\(\)]+$/, 
                        message: 'Ingresa un número de teléfono válido' 
                      }
                    })}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email *"
                    {...register('email', { 
                      required: 'El email es requerido',
                      pattern: { 
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                        message: 'Ingresa un email válido' 
                      }
                    })}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="url"
                    id="website"
                    placeholder="Sitio Web"
                    {...register('website', {
                      pattern: { 
                        value: /^https?:\/\/.+/i, 
                        message: 'Ingresa una URL válida (debe comenzar con http:// o https://)' 
                      }
                    })}
                    className={errors.website ? 'error' : ''}
                  />
                  {errors.website && <span className="error-message">{errors.website.message}</span>}
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

        {/* Sección de Empleados - Solo se muestra cuando showEmployees es true */}
        {showEmployees && (
          <div className="employees-overlay">
            <div className="employees-container">
              <div className="employees-header">
                <h2>👥 Empleados de {selectedRestaurantForEmployees?.name}</h2>
                <button className="close-btn" onClick={handleHideEmployees}>
                  ✕
                </button>
              </div>
              
              <div className="employees-content">
                {selectedRestaurantEmployees.length === 0 ? (
                  <div className="empty-employees">
                    <div className="empty-icon">👥</div>
                    <h3>No hay empleados registrados</h3>
                    <p>Contrata empleados para tu restaurante</p>
                  </div>
                ) : (
                  <div className="employees-grid">
                    {selectedRestaurantEmployees.map((employee) => (
                      <div key={employee.id} className="employee-card">
                        <div className="employee-header">
                          <div className="employee-avatar">
                            <span className="avatar-icon">👤</span>
                          </div>
                          <div className="employee-info">
                            <h3 className="employee-name">{employee.name}</h3>
                            <span className={`role-badge ${employee.isActive ? 'active' : 'inactive'}`}>
                              {employee.isActive ? '🟢 Activo' : '🔴 Inactivo'}
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
                          <div className="detail-item">
                            <span className="detail-label">💼 Rol:</span>
                            <span className="detail-value">{employee.role}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">📅 Contratado:</span>
                            <span className="detail-value">
                              {new Date(employee.hireDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="employee-actions">
                          <button className="action-btn-small">
                            ✏️ Editar
                          </button>
                          <button 
                            className="action-btn-small"
                            onClick={(e) => handleTransferEmployee(employee, e)}
                          >
                            🔄 Transferir
                          </button>
                          <button className="action-btn-small">
                            📊 Ver Perfil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Grid - Solo se muestra cuando NO se están mostrando los restaurantes ni empleados */}
        {!showRestaurants && !showAllEmployees && (
          <div className="dashboard-section">
            <h2>📊 Resumen General</h2>
            <div className="dashboard-grid">
              <div 
                className="dashboard-card clickable"
                onClick={handleShowRestaurants}
              >
                <div className="card-icon">🏪</div>
                <h3>Mis Restaurantes</h3>
                <p>Gestiona la información de tus restaurantes</p>
                <div className="card-stats">
                  <span className="stat-item">
                    <span className="stat-number">{restaurants.length}</span>
                    <span className="stat-label">Restaurantes</span>
                  </span>
                </div>
              </div>

              <div 
                className="dashboard-card clickable"
                onClick={handleShowAllEmployees}
              >
                <div className="card-icon">👥</div>
                <h3>Empleados</h3>
                <p>Administra tu equipo de trabajo</p>
                <div className="card-stats">
                  <span className="stat-item">
                    <span className="stat-number">{employees.length}</span>
                    <span className="stat-label">Empleados</span>
                  </span>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">🍽️</div>
                <h3>Menús</h3>
                <p>Gestiona productos y menús</p>
                <div className="card-stats">
                  <span className="stat-item">
                    <span className="stat-number">45</span>
                    <span className="stat-label">Productos</span>
                  </span>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">📊</div>
                <h3>Estadísticas</h3>
                <p>Monitorea el rendimiento</p>
                <div className="card-stats">
                  <span className="stat-item">
                    <span className="stat-number">$2,450</span>
                    <span className="stat-label">Ventas Hoy</span>
                  </span>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">📋</div>
                <h3>Órdenes</h3>
                <p>Gestiona pedidos y reservas</p>
                <div className="card-stats">
                  <span className="stat-item">
                    <span className="stat-number">8</span>
                    <span className="stat-label">Pendientes</span>
                  </span>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-icon">⚙️</div>
                <h3>Configuración</h3>
                <p>Ajusta preferencias del sistema</p>
                <div className="card-stats">
                  <span className="stat-item">
                    <span className="stat-number">-</span>
                    <span className="stat-label">Ajustes</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Transferencia de Empleados */}
      {selectedEmployeeForTransfer && (
        <EmployeeTransferModal
          employee={selectedEmployeeForTransfer}
          isOpen={transferModalOpen}
          onClose={handleCloseTransferModal}
        />
      )}
    </div>
  );
};

export default Restaurants;
