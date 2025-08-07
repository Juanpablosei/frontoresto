import React from 'react';
import { Button } from '../buttons';
import { EmployeeListProps } from './types';
import './EmployeeList.css';

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, restaurantName, onBack }) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'MANAGER':
        return '👔';
      case 'WAITER':
        return '🍽️';
      case 'COOK':
        return '👨‍🍳';
      case 'CASHIER':
        return '💰';
      case 'HOST':
        return '👋';
      case 'EMPLOYEE':
        return '👤';
      default:
        return '👤';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'MANAGER':
        return '#3498db';
      case 'WAITER':
        return '#e74c3c';
      case 'COOK':
        return '#f39c12';
      case 'CASHIER':
        return '#27ae60';
      case 'HOST':
        return '#9b59b6';
      case 'EMPLOYEE':
        return '#95a5a6';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="employee-list">
      <div className="list-header">
        <div className="header-content">
          <div className="header-info">
            <h2>👥 Empleados de {restaurantName}</h2>
            <p>Gestiona el personal del restaurante</p>
          </div>
          <div className="header-actions">
            <Button
              variant="secondary"
              size="medium"
              onClick={onBack}
            >
              ← Volver a Restaurantes
            </Button>
          </div>
        </div>
        <div className="header-stats">
          <span className="stat-item">
            <span className="stat-number">{employees.length}</span>
            <span className="stat-label">Empleados</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">
              {employees.filter(emp => emp.isActive).length}
            </span>
            <span className="stat-label">Activos</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">
              {new Set(employees.map(emp => emp.role)).size}
            </span>
            <span className="stat-label">Roles</span>
          </span>
        </div>
      </div>

      <div className="list-content">
        {employees.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No hay empleados registrados</h3>
            <p>Este restaurante aún no tiene empleados asignados</p>
          </div>
        ) : (
          <div className="employees-grid">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className={`employee-card ${!employee.isActive ? 'inactive' : ''}`}
              >
                <div className="employee-header">
                  <div 
                    className="employee-avatar"
                    style={{ backgroundColor: getRoleColor(employee.role) }}
                  >
                    <span className="avatar-icon">{getRoleIcon(employee.role)}</span>
                  </div>
                  <div className="employee-info">
                    <h3 className="employee-name">{employee.name}</h3>
                    <span className={`status-badge ${employee.isActive ? 'active' : 'inactive'}`}>
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
                    <span className="detail-label">👔 Rol:</span>
                    <span className="detail-value">{employee.role}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">📅 Registrado:</span>
                    <span className="detail-value">
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {employee.lastLogin && (
                    <div className="detail-item">
                      <span className="detail-label">🕒 Último acceso:</span>
                      <span className="detail-value">
                        {new Date(employee.lastLogin).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="employee-actions">
                  <Button
                    variant="primary"
                    size="small"
                    disabled={!employee.isActive}
                  >
                    ✏️ Editar
                  </Button>
                  <Button
                    variant={employee.isActive ? 'danger' : 'success'}
                    size="small"
                  >
                    {employee.isActive ? '🚫 Desactivar' : '✅ Activar'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="role-summary">
        <h3>📊 Resumen por Roles</h3>
        <div className="role-stats">
          {Array.from(new Set(employees.map(emp => emp.role))).map(role => {
            const count = employees.filter(emp => emp.role === role).length;
            const activeCount = employees.filter(emp => emp.role === role && emp.isActive).length;
            return (
              <div key={role} className="role-stat-item">
                <div className="role-icon" style={{ backgroundColor: getRoleColor(role) }}>
                  {getRoleIcon(role)}
                </div>
                <div className="role-info">
                  <span className="role-name">{role}</span>
                  <span className="role-count">{count} empleados ({activeCount} activos)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
