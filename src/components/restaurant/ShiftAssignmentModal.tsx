import React, { useState, useEffect } from 'react';
import { useRestaurantStore } from '../../store/restaurantStore';
import { Button } from '../buttons';
import { useThemeColors } from '../../hooks/useThemeColors';

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
  dayName,
}) => {
  const { employees } = useRestaurantStore();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    getModalBackground, 
    getModalOverlay, 
    getTextColor, 
    getInputBackground, 
    getInputBorder, 
    getInputFocusBorder,
    getTableHeaderBackground,
    getTableRowBackground,
    getCardBorder 
  } = useThemeColors();

  useEffect(() => {
    if (!isOpen) {
      setSelectedEmployees([]);
      setSearchTerm('');
    }
  }, [isOpen]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleAssignEmployees = async () => {
    setIsAssigning(true);
    try {
      await onAssignEmployees(selectedEmployees);
      onClose();
    } catch (error) {
      console.error('Error al asignar empleados:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedEmployees([]);
  };

  const getSelectedEmployeesByRole = () => {
    const selected = employees.filter(emp => selectedEmployees.includes(emp.id));
    const grouped = selected.reduce((acc, emp) => {
      if (!acc[emp.role]) acc[emp.role] = [];
      acc[emp.role].push(emp);
      return acc;
    }, {} as Record<string, typeof employees>);
    return grouped;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: getModalOverlay() }}
    >
      <div 
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
        style={{ backgroundColor: getModalBackground() }}
      >
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ borderColor: getCardBorder() }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 
                className="text-2xl font-bold"
                style={{ color: getTextColor(900) }}
              >
                👥 Asignar Empleados
              </h2>
              <p 
                className="text-sm mt-1"
                style={{ color: getTextColor(600) }}
              >
                {shiftName} - {dayName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl hover:opacity-70 transition-opacity"
              style={{ color: getTextColor(500) }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-6 border-b" style={{ borderColor: getCardBorder() }}>
          <input
            type="text"
            placeholder="Buscar empleados (ej: cook, waiter...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: getInputBackground(),
              borderColor: getInputBorder(),
              color: getTextColor(900),
            }}
            onFocus={(e) => {
              e.target.style.borderColor = getInputFocusBorder();
            }}
            onBlur={(e) => {
              e.target.style.borderColor = getInputBorder();
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-96 overflow-y-auto">
            {/* Table */}
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: getTableHeaderBackground() }}>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    Empleado
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    Rol
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className={`cursor-pointer transition-colors duration-200 ${
                      selectedEmployees.includes(employee.id) ? 'ring-2 ring-opacity-50' : ''
                    }`}
                    style={{ 
                      backgroundColor: getTableRowBackground(index % 2 === 0),
                    }}
                    onClick={() => handleEmployeeSelect(employee.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="text-sm font-medium"
                        style={{ color: getTextColor(900) }}
                      >
                        {employee.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="text-sm"
                        style={{ color: getTextColor(600) }}
                      >
                        {employee.role}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Employees */}
        {selectedEmployees.length > 0 && (
          <div className="p-6 border-t" style={{ borderColor: getCardBorder() }}>
            <div className="flex justify-between items-center mb-4">
              <h3 
                className="text-lg font-semibold"
                style={{ color: getTextColor(900) }}
              >
                Empleados Seleccionados ({selectedEmployees.length})
              </h3>
              <Button
                variant="secondary"
                size="small"
                onClick={handleClearSelection}
              >
                Quitar Selección
              </Button>
            </div>
            
            <div className="space-y-3">
              {Object.entries(getSelectedEmployeesByRole()).map(([role, roleEmployees]) => (
                <div key={role}>
                  <h4 
                    className="text-sm font-medium mb-2"
                    style={{ color: getTextColor(700) }}
                  >
                    {role}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {roleEmployees.map(employee => (
                      <div
                        key={employee.id}
                        className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                        style={{ 
                          backgroundColor: getTableRowBackground(false),
                          color: getTextColor(700),
                        }}
                      >
                        <span>{employee.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmployeeSelect(employee.id);
                          }}
                          className="text-xs hover:opacity-70 transition-opacity"
                          style={{ color: getTextColor(500) }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-3" style={{ borderColor: getCardBorder() }}>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleAssignEmployees}
            loading={isAssigning}
            disabled={selectedEmployees.length === 0}
          >
            {isAssigning ? 'Asignando...' : 'Asignar Empleados'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShiftAssignmentModal;
