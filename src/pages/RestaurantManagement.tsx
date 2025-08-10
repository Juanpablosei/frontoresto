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
  const [menus, setMenus] = useState([
    {
      id: 'menu-1',
      name: 'Menú Principal',
      description: 'Platos principales y especialidades de la casa',
      category: 'PRINCIPAL',
      price: 2500,
      isActive: true,
      items: 12,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 'menu-2',
      name: 'Menú Ejecutivo',
      description: 'Opciones rápidas para el almuerzo de trabajo',
      category: 'EJECUTIVO',
      price: 1800,
      isActive: true,
      items: 8,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 'menu-3',
      name: 'Carta de Vinos',
      description: 'Selección de vinos nacionales e importados',
      category: 'BEBIDAS',
      price: 0,
      isActive: true,
      items: 25,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    {
      id: 'menu-4',
      name: 'Menú Vegetariano',
      description: 'Opciones saludables sin carne',
      category: 'ESPECIAL',
      price: 2200,
      isActive: false,
      items: 6,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-25'
    },
    {
      id: 'menu-5',
      name: 'Postres',
      description: 'Dulces caseros y helados artesanales',
      category: 'POSTRES',
      price: 800,
      isActive: true,
      items: 10,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-22'
    }
  ]);

  // Estado para los platos
  const [platos, setPlatos] = useState([
    {
      id: 'plato-1',
      name: 'Milanesa a la Napolitana',
      description: 'Milanesa de ternera con jamón, queso mozzarella y salsa de tomate',
      category: 'PRINCIPAL',
      price: 3200,
      isActive: true,
      ingredients: ['Carne de ternera', 'Pan rallado', 'Jamón', 'Queso mozzarella', 'Salsa de tomate'],
      preparationTime: 25,
      allergens: ['Gluten', 'Lactosa'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-20'
    },
    {
      id: 'plato-2',
      name: 'Pizza Margherita',
      description: 'Pizza tradicional con masa artesanal, mozzarella y albahaca fresca',
      category: 'PIZZA',
      price: 2800,
      isActive: true,
      ingredients: ['Masa de pizza', 'Salsa de tomate', 'Mozzarella', 'Albahaca', 'Aceite de oliva'],
      preparationTime: 30,
      allergens: ['Gluten', 'Lactosa'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-18'
    },
    {
      id: 'plato-3',
      name: 'Ensalada César',
      description: 'Lechuga romana, crutones, parmesano y aderezo César casero',
      category: 'ENSALADA',
      price: 2200,
      isActive: true,
      ingredients: ['Lechuga romana', 'Crutones', 'Parmesano', 'Aderezo César', 'Limón'],
      preparationTime: 15,
      allergens: ['Gluten', 'Lactosa'],
      createdAt: '2024-01-12',
      updatedAt: '2024-01-22'
    },
    {
      id: 'plato-4',
      name: 'Tiramisú Clásico',
      description: 'Postre italiano con café, mascarpone y cacao en polvo',
      category: 'POSTRE',
      price: 1800,
      isActive: true,
      ingredients: ['Bizcochos de soletilla', 'Café espresso', 'Mascarpone', 'Huevos', 'Azúcar', 'Cacao'],
      preparationTime: 20,
      allergens: ['Gluten', 'Lactosa', 'Huevo'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    {
      id: 'plato-5',
      name: 'Pasta Carbonara',
      description: 'Pasta con salsa cremosa de huevo, queso parmesano y panceta',
      category: 'PASTA',
      price: 2600,
      isActive: false,
      ingredients: ['Pasta spaghetti', 'Huevos', 'Parmesano', 'Panceta', 'Pimienta negra'],
      preparationTime: 20,
      allergens: ['Gluten', 'Lactosa', 'Huevo'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-25'
    }
  ]);

  // Estado para los productos
  const [products, setProducts] = useState([
    {
      id: 'prod-1',
      name: 'Milanesa Napolitana',
      description: 'Milanesa con jamón, queso y tomate',
      category: 'PRINCIPAL',
      price: 2800,
      cost: 1200,
      stock: 50,
      isActive: true,
      allergens: ['Gluten', 'Lactosa'],
      preparationTime: 15,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-20'
    },
    {
      id: 'prod-2',
      name: 'Pizza Margherita',
      description: 'Pizza tradicional con mozzarella y albahaca',
      category: 'PIZZA',
      price: 2200,
      cost: 800,
      stock: 30,
      isActive: true,
      allergens: ['Gluten', 'Lactosa'],
      preparationTime: 20,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-18'
    },
    {
      id: 'prod-3',
      name: 'Ensalada César',
      description: 'Lechuga, crutones, parmesano y aderezo César',
      category: 'ENSALADA',
      price: 1800,
      cost: 600,
      stock: 25,
      isActive: true,
      allergens: ['Gluten', 'Lactosa'],
      preparationTime: 10,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-22'
    },
    {
      id: 'prod-4',
      name: 'Tiramisú',
      description: 'Postre italiano con café y mascarpone',
      category: 'POSTRE',
      price: 1200,
      cost: 400,
      stock: 15,
      isActive: true,
      allergens: ['Gluten', 'Lactosa', 'Huevo'],
      preparationTime: 5,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    {
      id: 'prod-5',
      name: 'Coca-Cola',
      description: 'Bebida gaseosa 500ml',
      category: 'BEBIDA',
      price: 500,
      cost: 200,
      stock: 100,
      isActive: true,
      allergens: [],
      preparationTime: 1,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-10'
    },
    {
      id: 'prod-6',
      name: 'Pasta Carbonara',
      description: 'Pasta con salsa cremosa y panceta',
      category: 'PASTA',
      price: 2400,
      cost: 900,
      stock: 0,
      isActive: false,
      allergens: ['Gluten', 'Lactosa', 'Huevo'],
      preparationTime: 18,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-25'
    }
  ]);

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
