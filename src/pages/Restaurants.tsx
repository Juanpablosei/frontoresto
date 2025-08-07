import React from 'react';
import { useAuth } from '../hooks/useAuth';
import UserInfo from '../components/auth/UserInfo';
import './Restaurants.css';

const Restaurants: React.FC = () => {
  const { user } = useAuth();

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
        <div className="welcome-section">
          <div className="welcome-card">
            <div className="welcome-icon">👋</div>
            <div className="welcome-text">
              <h2>¡Bienvenido, {user?.name}!</h2>
              <p>Aquí puedes gestionar todos tus restaurantes y configuraciones.</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">🏪</div>
            <h3>Mis Restaurantes</h3>
            <p>Gestiona la información de tus restaurantes</p>
            <div className="card-stats">
              <span className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Restaurantes</span>
              </span>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>Empleados</h3>
            <p>Administra tu equipo de trabajo</p>
            <div className="card-stats">
              <span className="stat-item">
                <span className="stat-number">12</span>
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

        <div className="quick-actions">
          <h3>Acciones Rápidas</h3>
          <div className="actions-grid">
            <button className="action-btn">
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
      </div>
    </div>
  );
};

export default Restaurants;
