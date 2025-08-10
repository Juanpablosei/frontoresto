import React from 'react';
import { Employee } from '../../store/restaurantStore';

interface EmployeesTableProps {
  employees: Employee[];
  getRestaurantById: (id: string) => any;
  onTransferEmployee: (employee: Employee, e: React.MouseEvent) => void;
  onHideAllEmployees: () => void;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
  getRestaurantById,
  onTransferEmployee,
  onHideAllEmployees
}) => {
  return (
    <div className="employees-section">
      <div className="section-header">
        <div className="header-actions-top">
          <button 
            className="back-btn"
            onClick={onHideAllEmployees}
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
                          onClick={(e) => onTransferEmployee(employee, e)}
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
  );
};

export default EmployeesTable;
