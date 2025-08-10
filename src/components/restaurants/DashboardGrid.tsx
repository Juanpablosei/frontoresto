import React from 'react';

interface DashboardGridProps {
  restaurantsCount: number;
  employeesCount: number;
  onShowRestaurants: () => void;
  onShowAllEmployees: () => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  restaurantsCount,
  employeesCount,
  onShowRestaurants,
  onShowAllEmployees
}) => {
  return (
    <div className="dashboard-section">
      <h2>📊 Resumen General</h2>
      <div className="dashboard-grid">
        <div 
          className="dashboard-card clickable"
          onClick={onShowRestaurants}
        >
          <div className="card-icon">🏪</div>
          <h3>Mis Restaurantes</h3>
          <p>Gestiona la información de tus restaurantes</p>
          <div className="card-stats">
            <span className="stat-item">
              <span className="stat-number">{restaurantsCount}</span>
              <span className="stat-label">Restaurantes</span>
            </span>
          </div>
        </div>

        <div 
          className="dashboard-card clickable"
          onClick={onShowAllEmployees}
        >
          <div className="card-icon">👥</div>
          <h3>Empleados</h3>
          <p>Administra tu equipo de trabajo</p>
          <div className="card-stats">
            <span className="stat-item">
              <span className="stat-number">{employeesCount}</span>
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
  );
};

export default DashboardGrid;
