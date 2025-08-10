import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import { useRestaurantSchedule } from '../store/scheduleStore';
import EmployeeTransferModal from '../components/restaurant/EmployeeTransferModal';
import ShiftAssignmentModal from '../components/restaurant/ShiftAssignmentModal';
import AddEmployeeModal from '../components/restaurant/AddEmployeeModal';
import ScheduleWizard from '../components/restaurant/ScheduleWizard';
import { 
  Header,
  TabNavigation,
  OverviewTab,
  EmployeesTab,
  MenusTab,
  PlatosTab,
  ProductsTab,
  TablesTab,
  StatsTab
} from '../components/restaurant-management';
import { mockMenus, mockPlatos, mockProducts, type MockMenu, type MockPlato, type MockProduct } from '../mock';

const RestaurantManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurantById, getEmployeesByRestaurant, clearAndReload } = useRestaurantStore();
  const { schedule, saveSchedule } = useRestaurantSchedule(id || '');
  
  const [restaurant, setRestaurant] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  
  // Estado para el modal de asignación de empleados al turno
  const [shiftAssignmentModalOpen, setShiftAssignmentModalOpen] = useState(false);
  const [newShiftData, setNewShiftData] = useState<{
    day: string;
    shiftId?: string;
    shiftName: string;
    dayName: string;
  } | null>(null);

  // Estado para el modal de agregar empleado
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);

  // Estado para el wizard de horarios
  const [scheduleWizardOpen, setScheduleWizardOpen] = useState(false);

  // Estado para los menús
  const [menus, setMenus] = useState<MockMenu[]>(mockMenus);

  // Estado para los platos
  const [platos, setPlatos] = useState<MockPlato[]>(mockPlatos);

  // Estado para los productos
  const [products, setProducts] = useState<MockProduct[]>(mockProducts);

  // Usar el schedule del store de Zustand
  const detailedSchedule = schedule;

  useEffect(() => {
    if (id) {
      const restaurantData = getRestaurantById(id);
      if (restaurantData) {
        setRestaurant(restaurantData);
        const restaurantEmployees = getEmployeesByRestaurant(id);
        setEmployees(restaurantEmployees);
      } else {
        console.error('Restaurante no encontrado');
        navigate('/dashboard');
      }
    }
  }, [id, getRestaurantById, getEmployeesByRestaurant, navigate]);

  const handleBackToRestaurants = () => {
    navigate('/dashboard');
  };

  const handleEditRestaurant = () => {
    // Implementar edición del restaurante
    console.log('Editar restaurante:', restaurant?.name);
  };

  const handleToggleStatus = () => {
    if (restaurant) {
      setRestaurant({
        ...restaurant,
        isOpen: !restaurant.isOpen
      });
    }
  };

  const handleTransferEmployee = (employee: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEmployee(employee);
    setTransferModalOpen(true);
  };

  const handleCloseTransferModal = () => {
    setTransferModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleOpenScheduleWizard = () => {
    setScheduleWizardOpen(true);
  };

  const handleCloseScheduleWizard = () => {
    setScheduleWizardOpen(false);
  };

  const handleOpenAddEmployeeModal = () => {
    setAddEmployeeModalOpen(true);
  };

  const handleCloseAddEmployeeModal = () => {
    setAddEmployeeModalOpen(false);
  };

  const handleAddEmployee = (employeeData: {
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
  }) => {
    const newEmployee = {
      id: `emp-${Date.now()}`,
      name: employeeData.name,
      email: employeeData.email,
      phone: employeeData.phone,
      role: employeeData.role,
      status: employeeData.status,
      restaurantId: id,
      hireDate: new Date().toISOString().split('T')[0],
      isActive: employeeData.status === 'ACTIVE'
    };

    setEmployees(prev => [...prev, newEmployee]);
    handleCloseAddEmployeeModal();
  };

  // Funciones para manejar menús
  const handleToggleMenuStatus = (menuId: string) => {
    setMenus(prev => prev.map(menu => 
      menu.id === menuId 
        ? { ...menu, isActive: !menu.isActive }
        : menu
    ));
  };

  const handleEditMenu = (menuId: string) => {
    console.log('Editar menú:', menuId);
    // Implementar edición del menú
  };

  const handleDeleteMenu = (menuId: string) => {
    setMenus(prev => prev.filter(menu => menu.id !== menuId));
  };

  const handleAddMenu = () => {
    const newMenu = {
      id: `menu-${Date.now()}`,
      name: 'Nuevo Menú',
      description: 'Descripción del nuevo menú',
      category: 'PRINCIPAL',
      price: 0,
      isActive: true,
      items: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setMenus(prev => [...prev, newMenu]);
  };

  // Funciones para manejar productos
  const handleToggleProductStatus = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, isActive: !product.isActive }
        : product
    ));
  };

  const handleEditProduct = (productId: string) => {
    console.log('Editar producto:', productId);
    // Implementar edición del producto
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      name: 'Nuevo Producto',
      description: 'Descripción del nuevo producto',
      category: 'PRINCIPAL',
      price: 0,
      cost: 0,
      stock: 0,
      isActive: true,
      allergens: [],
      preparationTime: 10,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [...prev, newProduct]);
  };

  // Funciones para manejar platos
  const handleTogglePlatoStatus = (platoId: string) => {
    setPlatos(platos.map(plato => 
      plato.id === platoId 
        ? { ...plato, isActive: !plato.isActive }
        : plato
    ));
  };

  const handleEditPlato = (platoId: string) => {
    console.log('Editar plato:', platoId);
  };

  const handleDeletePlato = (platoId: string) => {
    setPlatos(platos.filter(plato => plato.id !== platoId));
  };

  const handleAddPlato = () => {
    const newPlato = {
      id: `plato-${Date.now()}`,
      name: 'Nuevo Plato',
      description: 'Descripción del nuevo plato',
      category: 'PRINCIPAL',
      price: 0,
      isActive: true,
      ingredients: [],
      preparationTime: 15,
      allergens: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setPlatos(prev => [...prev, newPlato]);
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Cargando restaurante...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <Header onBackToRestaurants={handleBackToRestaurants} />

      {/* Tabs */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <OverviewTab
            restaurant={restaurant}
            employees={employees}
            menus={menus}
            products={products}
            platos={platos}
            schedule={schedule}
            onEditRestaurant={handleEditRestaurant}
            onToggleStatus={handleToggleStatus}
            onOpenScheduleWizard={handleOpenScheduleWizard}
          />
        )}
        {activeTab === 'employees' && (
          <EmployeesTab
            employees={employees}
            onAddEmployee={handleOpenAddEmployeeModal}
            onTransferEmployee={handleTransferEmployee}
          />
        )}
        {activeTab === 'menus' && (
          <MenusTab
            menus={menus}
            onAddMenu={handleAddMenu}
            onEditMenu={handleEditMenu}
            onToggleMenuStatus={handleToggleMenuStatus}
            onDeleteMenu={handleDeleteMenu}
          />
        )}
        {activeTab === 'platos' && (
          <PlatosTab
            platos={platos}
            onAddPlato={handleAddPlato}
            onEditPlato={handleEditPlato}
            onTogglePlatoStatus={handleTogglePlatoStatus}
            onDeletePlato={handleDeletePlato}
          />
        )}
        {activeTab === 'products' && (
          <ProductsTab
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onToggleProductStatus={handleToggleProductStatus}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
        {activeTab === 'tables' && <TablesTab />}
        {activeTab === 'stats' && <StatsTab />}
      </div>

      {/* Modals */}
      {transferModalOpen && selectedEmployee && (
        <EmployeeTransferModal
          isOpen={transferModalOpen}
          onClose={handleCloseTransferModal}
          employee={selectedEmployee}
        />
      )}

      <AddEmployeeModal
        isOpen={addEmployeeModalOpen}
        onClose={handleCloseAddEmployeeModal}
        onAddEmployee={handleAddEmployee}
      />

      <ScheduleWizard
        isOpen={scheduleWizardOpen}
        onClose={handleCloseScheduleWizard}
        restaurantId={id || ''}
      />
    </div>
  );
};

export default RestaurantManagement;
