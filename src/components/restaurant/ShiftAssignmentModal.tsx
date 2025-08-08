import React, { useState, useMemo } from 'react';
import { useRestaurantStore, Employee } from '../../store/restaurantStore';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Asignar Empleados - {dayName} - {shiftName}</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors duration-200"
            onClick={handleClose}
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Buscar empleados por nombre o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-sm text-gray-600">
              {filteredEmployees.length} de {employees.length} empleados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-200">Empleado</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-200">Rol</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr 
                      key={employee.id}
                      className={`border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 ${
                        selectedEmployees.includes(employee.id) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td 
                        className="p-3 cursor-pointer"
                        onClick={() => handleEmployeeToggle(employee.id)}
                      >
                        <span className="font-medium text-gray-800">{employee.name}</span>
                      </td>
                      <td className="p-3">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {employee.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="p-6 text-center text-gray-500">
                      No se encontraron empleados que coincidan con "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">
                Empleados seleccionados: <strong className="text-blue-600">{selectedEmployees.length}</strong>
              </span>
              {selectedEmployees.length > 0 && (
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-red-600 hover:scale-105"
                  onClick={handleClearSelection}
                >
                  Quitar selección
                </button>
              )}
            </div>
            {selectedEmployees.length > 0 && (
              <div className="space-y-4">
                {Object.entries(selectedEmployeesByRole).map(([role, employees]) => (
                  <div key={role} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">{role}</h4>
                    <div className="flex flex-wrap gap-2">
                      {employees.map((employee) => (
                        <div key={employee.id} className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm border border-gray-200">
                          <span className="text-gray-800 font-medium">{employee.name}</span>
                          <button 
                            className="text-red-500 hover:text-red-700 font-bold text-lg transition-colors duration-200 hover:scale-110"
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

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button 
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-600"
              onClick={handleClose}
              disabled={isAssigning}
            >
              Cancelar
            </button>
            <button 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAssign}
              disabled={selectedEmployees.length === 0 || isAssigning}
            >
              {isAssigning ? 'Asignando...' : 'Asignar Empleados'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftAssignmentModal;
