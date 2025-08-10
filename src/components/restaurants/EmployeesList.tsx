import React from 'react';
import { Employee } from '../../store/restaurantStore';

interface EmployeesListProps {
  employees: Employee[];
  restaurantName?: string;
  onTransferEmployee: (employee: Employee, e: React.MouseEvent) => void;
  onHideEmployees: () => void;
}

const EmployeesList: React.FC<EmployeesListProps> = ({
  employees,
  restaurantName,
  onTransferEmployee,
  onHideEmployees
}) => {
  return (
    <div className="employees-overlay">
      <div className="employees-container">
        <div className="employees-header">
          <h2>👥 Empleados de {restaurantName}</h2>
          <button className="close-btn" onClick={onHideEmployees}>
            ✕
          </button>
        </div>
        
        <div className="employees-content">
          {employees.length === 0 ? (
            <div className="empty-employees">
              <div className="empty-icon">👥</div>
              <h3>No hay empleados registrados</h3>
              <p>Contrata empleados para tu restaurante</p>
            </div>
          ) : (
            <div className="employees-grid">
              {employees.map((employee) => (
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
                      onClick={(e) => onTransferEmployee(employee, e)}
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
  );
};

export default EmployeesList;
