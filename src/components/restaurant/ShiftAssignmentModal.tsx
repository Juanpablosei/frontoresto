import React, { useState, useMemo } from 'react';
import { useRestaurantStore, Employee } from '../../store/restaurantStore';
import './ShiftAssignmentModal.css';

interface ShiftAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssignEmployees: (employeeIds: string[]) => void;
  shiftName: string;
  dayName: string;
}

const ShiftAssignmentModal: React.FC<ShiftAssignmentModalProps> = ({
  isOpen,
  onClose,
  onAssignEmployees,
  shiftName,
  dayName
}) => {
  const { getEmployeesByRestaurant } = useRestaurantStore();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener empleados del restaurante actual
  const employees = getEmployeesByRestaurant('1').filter(emp => emp.isActive);

  // Filtrar empleados basado en el término de búsqueda
  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return employees;
    
    const searchLower = searchTerm.toLowerCase();
    return employees.filter(employee => 
      employee.name.toLowerCase().includes(searchLower) ||
      employee.role.toLowerCase().includes(searchLower)
    );
  }, [employees, searchTerm]);

  // Agrupar empleados seleccionados por rol
  const selectedEmployeesByRole = useMemo(() => {
    const grouped: { [role: string]: Employee[] } = {};
    
    selectedEmployees.forEach(employeeId => {
      const employee = employees.find(emp => emp.id === employeeId);
      if (employee) {
        if (!grouped[employee.role]) {
          grouped[employee.role] = [];
        }
        grouped[employee.role].push(employee);
      }
    });
    
    return grouped;
  }, [selectedEmployees, employees]);

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleRemoveEmployee = (employeeId: string) => {
    setSelectedEmployees(prev => prev.filter(id => id !== employeeId));
  };

  const handleClearSelection = () => {
    setSelectedEmployees([]);
  };

  const handleAssign = async () => {
    setIsAssigning(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onAssignEmployees(selectedEmployees);
      onClose();
      setSelectedEmployees([]);
      setSearchTerm('');
    } catch (error) {
      console.error('Error al asignar empleados:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleClose = () => {
    setSelectedEmployees([]);
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="shift-assignment-overlay">
      <div className="shift-assignment-container">
        <div className="shift-assignment-header">
          <h2>Asignar Empleados - {dayName} - {shiftName}</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="shift-assignment-content">
          <div className="search-section">
            <input
              type="text"
              placeholder="Buscar empleados por nombre o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-results">
              {filteredEmployees.length} de {employees.length} empleados
            </span>
          </div>

          <div className="employees-table-container">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr 
                      key={employee.id}
                      className={selectedEmployees.includes(employee.id) ? 'selected-row' : ''}
                    >
                      <td 
                        className="employee-name-cell"
                        onClick={() => handleEmployeeToggle(employee.id)}
                      >
                        {employee.name}
                      </td>
                      <td>{employee.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="no-results">
                      No se encontraron empleados que coincidan con "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="assignment-summary">
            <div className="summary-header">
              <span>Empleados seleccionados: <strong>{selectedEmployees.length}</strong></span>
              {selectedEmployees.length > 0 && (
                <button className="clear-selection-btn" onClick={handleClearSelection}>
                  Quitar selección
                </button>
              )}
            </div>
            {selectedEmployees.length > 0 && (
              <div className="selected-employees-by-role">
                {Object.entries(selectedEmployeesByRole).map(([role, employees]) => (
                  <div key={role} className="role-group">
                    <h4 className="role-title">{role}</h4>
                    <div className="role-employees">
                      {employees.map((employee) => (
                        <div key={employee.id} className="selected-employee-item">
                          <span className="employee-name">{employee.name}</span>
                          <button 
                            className="remove-employee-btn"
                            onClick={() => handleRemoveEmployee(employee.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="assignment-actions">
            <button className="cancel-btn" onClick={handleClose} disabled={isAssigning}>
              Cancelar
            </button>
            <button className="assign-btn" onClick={handleAssign} disabled={isAssigning}>
              {isAssigning ? 'Asignando...' : 'Asignar Empleados'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftAssignmentModal;
