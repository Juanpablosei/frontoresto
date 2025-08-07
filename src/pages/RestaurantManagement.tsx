import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import './RestaurantManagement.css';

const RestaurantManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurantById, getEmployeesByRestaurant } = useRestaurantStore();
  
  const [restaurant, setRestaurant] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      const foundRestaurant = getRestaurantById(id);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        const restaurantEmployees = getEmployeesByRestaurant(id);
        setEmployees(restaurantEmployees);
      } else {
        // Si no se encuentra el restaurante, redirigir
        navigate('/restaurants');
      }
    }
  }, [id, getRestaurantById, getEmployeesByRestaurant, navigate]);

  if (!restaurant) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando restaurante...</p>
      </div>
    );
  }

  const handleBackToRestaurants = () => {
    navigate('/restaurants');
  };

  const handleEditRestaurant = () => {
    // TODO: Implementar edición
    console.log('Editar restaurante:', restaurant.id);
  };

  const handleToggleStatus = () => {
    // TODO: Implementar cambio de estado
    console.log('Cambiar estado del restaurante:', restaurant.id);
  };

  const renderOverviewTab = () => (
    <div className="overview-section">
      <div className="restaurant-header-large">
        <div className="restaurant-icon-large">
          <span className="icon-large">🏪</span>
        </div>
        <div className="restaurant-info-large">
          <h1 className="restaurant-name-large">{restaurant.name}</h1>
          <span className={`status-badge-large ${restaurant.isOpen ? 'open' : 'closed'}`}>
            {restaurant.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
          </span>
        </div>
      </div>

      <div className="restaurant-details-grid">
        <div className="detail-card">
          <h3>📍 Información de Contacto</h3>
          <div className="detail-item">
            <span className="detail-label">Dirección:</span>
            <span className="detail-value">{restaurant.address}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Teléfono:</span>
            <span className="detail-value">{restaurant.phone}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{restaurant.email}</span>
          </div>
          {restaurant.website && (
            <div className="detail-item">
              <span className="detail-label">Sitio Web:</span>
              <span className="detail-value">{restaurant.website}</span>
            </div>
          )}
        </div>

        <div className="detail-card">
          <h3>📊 Estadísticas</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{employees.length}</span>
              <span className="stat-label">Empleados</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Mesas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">45</span>
              <span className="stat-label">Productos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Menús</span>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h3>📝 Descripción</h3>
          <p className="restaurant-description-large">{restaurant.description}</p>
        </div>

        <div className="detail-card">
          <h3>📅 Información del Sistema</h3>
          <div className="detail-item">
            <span className="detail-label">Creado:</span>
            <span className="detail-value">
              {new Date(restaurant.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Estado:</span>
            <span className={`status-badge ${restaurant.isActive ? 'active' : 'inactive'}`}>
              {restaurant.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmployeesTab = () => (
    <div className="employees-section">
      <div className="section-header">
        <h2>👥 Empleados ({employees.length})</h2>
        <button className="add-employee-btn">
          ➕ Agregar Empleado
        </button>
      </div>

      {employees.length === 0 ? (
        <div className="empty-employees">
          <div className="empty-icon">👥</div>
          <h3>No hay empleados en este restaurante</h3>
          <p>Agrega empleados para comenzar a operar</p>
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
                <th>Estado</th>
                <th>Contratado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
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
                      <button className="action-btn-table" title="Ver perfil">📊</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderMenusTab = () => (
    <div className="menus-section">
      <div className="section-header">
        <h2>🍽️ Menús</h2>
        <button className="add-menu-btn">
          ➕ Crear Menú
        </button>
      </div>
      
      <div className="empty-section">
        <div className="empty-icon">🍽️</div>
        <h3>No hay menús creados</h3>
        <p>Crea menús para tu restaurante</p>
      </div>
    </div>
  );

  const renderProductsTab = () => (
    <div className="products-section">
      <div className="section-header">
        <h2>🛍️ Productos</h2>
        <button className="add-product-btn">
          ➕ Agregar Producto
        </button>
      </div>
      
      <div className="empty-section">
        <div className="empty-icon">🛍️</div>
        <h3>No hay productos registrados</h3>
        <p>Agrega productos a tu inventario</p>
      </div>
    </div>
  );

  const renderTablesTab = () => (
    <div className="tables-section">
      <div className="section-header">
        <h2>🪑 Mesas</h2>
        <button className="add-table-btn">
          ➕ Agregar Mesa
        </button>
      </div>
      
      <div className="empty-section">
        <div className="empty-icon">🪑</div>
        <h3>No hay mesas configuradas</h3>
        <p>Configura las mesas de tu restaurante</p>
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="stats-section">
      <div className="section-header">
        <h2>📊 Estadísticas</h2>
      </div>
      
      <div className="stats-grid-large">
        <div className="stat-card">
          <h3>Ventas del Día</h3>
          <div className="stat-value">$1,250</div>
          <div className="stat-change positive">+12% vs ayer</div>
        </div>
        <div className="stat-card">
          <h3>Órdenes Pendientes</h3>
          <div className="stat-value">8</div>
          <div className="stat-change neutral">Sin cambios</div>
        </div>
        <div className="stat-card">
          <h3>Clientes Atendidos</h3>
          <div className="stat-value">45</div>
          <div className="stat-change positive">+5 vs ayer</div>
        </div>
        <div className="stat-card">
          <h3>Producto Más Vendido</h3>
          <div className="stat-value">Hamburguesa Clásica</div>
          <div className="stat-change positive">23 ventas</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="restaurant-management">
      <div className="management-header">
        <div className="header-actions">
          <button className="back-btn" onClick={handleBackToRestaurants}>
            ← Volver a Mis Restaurantes
          </button>
        </div>
        <div className="header-actions-right">
          <button className="edit-btn" onClick={handleEditRestaurant}>
            ✏️ Editar Restaurante
          </button>
          <button 
            className={`status-btn ${restaurant.isOpen ? 'close' : 'open'}`}
            onClick={handleToggleStatus}
          >
            {restaurant.isOpen ? '🔴 Cerrar' : '🟢 Abrir'} Restaurante
          </button>
        </div>
      </div>

      <div className="management-content">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Resumen
          </button>
          <button 
            className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            👥 Empleados
          </button>
          <button 
            className={`tab-btn ${activeTab === 'menus' ? 'active' : ''}`}
            onClick={() => setActiveTab('menus')}
          >
            🍽️ Menús
          </button>
          <button 
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            🛍️ Productos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tables' ? 'active' : ''}`}
            onClick={() => setActiveTab('tables')}
          >
            🪑 Mesas
          </button>
          <button 
            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Estadísticas
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'employees' && renderEmployeesTab()}
          {activeTab === 'menus' && renderMenusTab()}
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'tables' && renderTablesTab()}
          {activeTab === 'stats' && renderStatsTab()}
        </div>
      </div>
    </div>
  );
};

export default RestaurantManagement;
