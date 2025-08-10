import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRestaurantStore, Employee } from '../../store/restaurantStore';
import EmployeeTransferModal from '../../components/restaurant/EmployeeTransferModal';
import {
  Header,
  QuickActions,
  RestaurantsList,
  EmployeesTable,
  EmployeesList,
  EditRestaurantForm,
  DashboardGrid
} from '../../components/restaurants';


interface EditRestaurantData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

const Restaurants: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedEmployeeForTransfer, setSelectedEmployeeForTransfer] = useState<Employee | null>(null);
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  
  // Usar el store de Zustand
  const {
    restaurants,
    employees,
    showRestaurants,
    editingRestaurant,
    showEmployees,
    selectedRestaurantEmployees,
    selectedRestaurantForEmployees,
    setShowRestaurants,
    setShowEmployees,
    setSelectedRestaurantEmployees,
    setSelectedRestaurantForEmployees,
    setEditingRestaurant,
    updateRestaurant,
    getEmployeesByRestaurant,
    getRestaurantById
  } = useRestaurantStore();

  const handleShowRestaurants = () => {
    setShowRestaurants(true);
    setShowAllEmployees(false);
  };

  const handleHideRestaurants = () => {
    setShowRestaurants(false);
    setEditingRestaurant(null);
  };

  const handleShowAllEmployees = () => {
    setShowAllEmployees(true);
    setShowRestaurants(false);
  };

  const handleHideAllEmployees = () => {
    setShowAllEmployees(false);
  };

  const handleShowEmployees = (restaurant: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRestaurantForEmployees(restaurant);
    
    // Obtener empleados del restaurante desde el store
    const restaurantEmployees = getEmployeesByRestaurant(restaurant.id);
    setSelectedRestaurantEmployees(restaurantEmployees);
    setShowEmployees(true);
  };

  const handleHideEmployees = () => {
    setShowEmployees(false);
    setSelectedRestaurantForEmployees(null);
    setSelectedRestaurantEmployees([]);
  };

  const handleEditRestaurant = (restaurant: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRestaurant(restaurant);
  };

  const handleCancelEdit = () => {
    setEditingRestaurant(null);
  };

  const onSubmitEdit = (data: EditRestaurantData) => {
    if (editingRestaurant) {
      updateRestaurant(editingRestaurant.id, data);
      setEditingRestaurant(null);
    }
  };

  const handleTransferEmployee = (employee: Employee, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEmployeeForTransfer(employee);
    setTransferModalOpen(true);
  };

  const handleCloseTransferModal = () => {
    setTransferModalOpen(false);
    setSelectedEmployeeForTransfer(null);
    // Refrescar la lista de empleados después de la transferencia
    if (selectedRestaurantForEmployees) {
      const updatedEmployees = getEmployeesByRestaurant(selectedRestaurantForEmployees.id);
      setSelectedRestaurantEmployees(updatedEmployees);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuickActions />

        {/* Sección de Lista de Restaurantes */}
        {showRestaurants && (
          <RestaurantsList
            restaurants={restaurants}
            onEdit={handleEditRestaurant}
            onShowEmployees={handleShowEmployees}
            onHideRestaurants={handleHideRestaurants}
          />
        )}

        {/* Sección de Todos los Empleados */}
        {showAllEmployees && (
          <EmployeesTable
            employees={employees}
            getRestaurantById={getRestaurantById}
            onTransferEmployee={handleTransferEmployee}
            onHideAllEmployees={handleHideAllEmployees}
          />
        )}

        {/* Formulario de Edición */}
        {editingRestaurant && (
          <EditRestaurantForm
            onSubmit={onSubmitEdit}
            onCancel={handleCancelEdit}
            initialData={{
              name: editingRestaurant.name,
              description: editingRestaurant.description,
              address: editingRestaurant.address,
              phone: editingRestaurant.phone,
              email: editingRestaurant.email,
              website: editingRestaurant.website
            }}
          />
        )}

        {/* Sección de Empleados */}
        {showEmployees && (
          <EmployeesList
            employees={selectedRestaurantEmployees}
            restaurantName={selectedRestaurantForEmployees?.name}
            onTransferEmployee={handleTransferEmployee}
            onHideEmployees={handleHideEmployees}
          />
        )}

        {/* Dashboard Grid */}
        {!showRestaurants && !showAllEmployees && (
          <DashboardGrid
            restaurantsCount={restaurants.length}
            employeesCount={employees.length}
            onShowRestaurants={handleShowRestaurants}
            onShowAllEmployees={handleShowAllEmployees}
          />
        )}
      </div>

      {/* Modal de Transferencia de Empleados */}
      {selectedEmployeeForTransfer && (
        <EmployeeTransferModal
          employee={selectedEmployeeForTransfer}
          isOpen={transferModalOpen}
          onClose={handleCloseTransferModal}
        />
      )}
    </div>
  );
};

export default Restaurants;
