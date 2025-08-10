import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default QuickActions;
