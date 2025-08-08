import React, { useState } from 'react';
import { useRestaurantStore, Employee } from '../../store/restaurantStore';

interface EmployeeTransferModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeTransferModal: React.FC<EmployeeTransferModalProps> = ({
  employee,
  isOpen,
  onClose
}) => {
  const { restaurants, moveEmployee } = useRestaurantStore();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  const [isTransferring, setIsTransferring] = useState(false);

  // Filtrar restaurantes disponibles (excluir el actual)
  const availableRestaurants = restaurants.filter(
    restaurant => restaurant.id !== employee.restaurantId
  );

  const currentRestaurant = restaurants.find(
    restaurant => restaurant.id === employee.restaurantId
  );

  const handleTransfer = async () => {
    if (!selectedRestaurantId) return;

    setIsTransferring(true);
    
    try {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mover el empleado usando el store
      moveEmployee(employee.id, selectedRestaurantId);
      
      // Cerrar el modal
      onClose();
      setSelectedRestaurantId('');
    } catch (error) {
      console.error('Error al transferir empleado:', error);
    } finally {
      setIsTransferring(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-100">
          <h2 className="text-2xl font-bold text-amber-800">🔄 Transferir Empleado</h2>
          <button 
            className="bg-none border-none text-2xl text-gray-500 cursor-pointer p-2 rounded-full transition-all duration-300 w-10 h-10 flex items-center justify-center hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-300">
            <div className="w-15 h-15 bg-gradient-to-br from-amber-800 to-amber-700 rounded-full flex items-center justify-center">
              <span className="text-3xl text-white">👤</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">{employee.name}</h3>
              <p className="text-gray-700 font-semibold text-base mb-2">{employee.role}</p>
              <p className="text-amber-800 text-sm">
                Actualmente en: <strong>{currentRestaurant?.name}</strong>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-4">Seleccionar Nuevo Restaurante</h4>
            <div className="flex flex-col gap-3">
              {availableRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className={`flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-300 bg-white hover:border-amber-600 hover:bg-amber-50 hover:-translate-y-0.5 ${
                    selectedRestaurantId === restaurant.id ? 'border-amber-800 bg-gradient-to-br from-amber-50 to-amber-100 shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedRestaurantId(restaurant.id)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl">🏪</span>
                    <div>
                      <h5 className="text-amber-800 font-semibold text-lg mb-1">{restaurant.name}</h5>
                      <p className="text-gray-600 text-sm">{restaurant.address}</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-sm">
                    {selectedRestaurantId === restaurant.id && '✓'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-6 border-t border-gray-100">
            <button 
              className="bg-gray-100 text-gray-600 border-2 border-gray-200 rounded-lg px-6 py-3 text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={isTransferring}
            >
              Cancelar
            </button>
            <button
              className="bg-gradient-to-r from-amber-800 to-amber-700 text-white border-none rounded-lg px-6 py-3 text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleTransfer}
              disabled={!selectedRestaurantId || isTransferring}
            >
              {isTransferring ? '🔄 Transfiriendo...' : '🔄 Transferir Empleado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTransferModal;
