import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import { useRestaurantSchedule } from '../store/scheduleStore';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageSelector } from '../components/language';
import EmployeeTransferModal from '../components/restaurant/EmployeeTransferModal';
import ShiftAssignmentModal from '../components/restaurant/ShiftAssignmentModal';
import AddEmployeeModal from '../components/restaurant/AddEmployeeModal';
import ScheduleWizard from '../components/restaurant/ScheduleWizard';
import Button from '../components/buttons/Button';
import { useThemeColors } from '../hooks/useThemeColors';

const RestaurantManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurantById, getEmployeesByRestaurant, clearAndReload } = useRestaurantStore();
  const { schedule, saveSchedule } = useRestaurantSchedule(id || '');
  const { t } = useTranslation();
  const { 
    getCardBackground, 
    getCardBorder, 
    getTextColor, 
    getDangerColor,
    getSuccessColor,
    getWarningColor,
    getInfoColor
  } = useThemeColors();
  
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

  const handleAddShift = (day: string) => {
    const daySchedule = detailedSchedule[day as keyof typeof detailedSchedule];
    const newShiftId = `${day}-shift-${Date.now()}`;
    const newShift = {
      id: newShiftId,
      name: 'Nuevo Turno',
      startTime: '09:00',
      endTime: '17:00',
      assignedEmployees: []
    };

    const updatedSchedule = {
      ...detailedSchedule,
      [day]: {
        ...daySchedule,
        shifts: [...(daySchedule?.shifts || []), newShift]
      }
    };
    
    saveSchedule(updatedSchedule);
  };

  const handleOpenAssignmentModal = (day: string, shiftId: string) => {
    const daySchedule = detailedSchedule[day as keyof typeof detailedSchedule];
    const shift = daySchedule.shifts.find(s => s.id === shiftId);
    
    if (shift) {
      setNewShiftData({
        day,
        shiftId,
        shiftName: shift.name,
        dayName: day.charAt(0).toUpperCase() + day.slice(1)
      });
      setShiftAssignmentModalOpen(true);
    }
  };

  const handleAssignEmployeesToShift = (employeeIds: string[]) => {
    if (newShiftData) {
      const updatedSchedule = {
        ...detailedSchedule,
        [newShiftData.day]: {
          ...detailedSchedule[newShiftData.day as keyof typeof detailedSchedule],
          shifts: detailedSchedule[newShiftData.day as keyof typeof detailedSchedule].shifts.map(shift => {
            if (shift.id === newShiftData.shiftId) {
              return {
                ...shift,
                assignedEmployees: employeeIds
              };
            }
            return shift;
          })
        }
      };
      
      saveSchedule(updatedSchedule);
    }
  };

  const handleUpdateShift = (day: string, shiftId: string, field: string, value: any) => {
    const updatedSchedule = {
      ...detailedSchedule,
      [day]: {
        ...detailedSchedule[day as keyof typeof detailedSchedule],
        shifts: detailedSchedule[day as keyof typeof detailedSchedule].shifts.map(shift => {
          if (shift.id === shiftId) {
            return {
              ...shift,
              [field]: value
            };
          }
          return shift;
        })
      }
    };
    
    saveSchedule(updatedSchedule);
  };

  const handleRemoveShift = (day: string, shiftId: string) => {
    const updatedSchedule = {
      ...detailedSchedule,
      [day]: {
        ...detailedSchedule[day as keyof typeof detailedSchedule],
        shifts: detailedSchedule[day as keyof typeof detailedSchedule].shifts.filter(shift => shift.id !== shiftId)
      }
    };
    
    saveSchedule(updatedSchedule);
  };

  const calculateWorkHours = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours;
  };

  const handleUpdateDayHours = (day: string, field: 'openingHours' | 'closingHours', value: string) => {
    const updatedSchedule = {
      ...detailedSchedule,
      [day]: {
        ...detailedSchedule[day as keyof typeof detailedSchedule],
        [field]: value
      }
    };
    
    saveSchedule(updatedSchedule);
  };

  const calculateShiftCoverage = (day: string) => {
    const daySchedule = detailedSchedule[day as keyof typeof detailedSchedule];
    const totalDayHours = calculateWorkHours(daySchedule.openingHours, daySchedule.closingHours);
    const totalShiftHours = daySchedule.shifts.reduce((total, shift) => {
      return total + calculateWorkHours(shift.startTime, shift.endTime);
    }, 0);
    
    return Math.min((totalShiftHours / totalDayHours) * 100, 100);
  };

  const handleCloseShiftAssignmentModal = () => {
    setShiftAssignmentModalOpen(false);
    setNewShiftData(null);
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

  const handleAssignEmployeesToNewShift = (employeeIds: string[]) => {
    if (newShiftData) {
      handleAssignEmployeesToShift(employeeIds);
      handleCloseShiftAssignmentModal();
    }
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

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Información del Restaurante */}
      <div 
        className="p-6 rounded-xl border shadow-lg"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ color: getTextColor(900) }}
            >
              🏪 {restaurant.name}
            </h2>
            <p 
              className="text-lg mb-2"
              style={{ color: getTextColor(600) }}
            >
              {restaurant.description}
            </p>
            <div className="flex items-center gap-4">
              <span 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  restaurant.isOpen ? 'text-white' : 'text-white'
                }`}
                style={{
                  backgroundColor: restaurant.isOpen ? getSuccessColor() : getDangerColor()
                }}
              >
                {restaurant.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
              </span>
              <span 
                className="text-sm"
                style={{ color: getTextColor(600) }}
              >
                📍 {restaurant.address}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={handleEditRestaurant}
            >
              ✏️ Editar
            </Button>
            <Button
              variant={restaurant.isOpen ? 'danger' : 'success'}
              onClick={handleToggleStatus}
            >
              {restaurant.isOpen ? '🔴 Cerrar' : '🟢 Abrir'}
            </Button>
          </div>
        </div>
      </div>

      {/* Información de Contacto y Estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Información de Contacto */}
        <div 
          className="p-6 rounded-xl border shadow-lg"
          style={{
            backgroundColor: getCardBackground(),
            borderColor: getCardBorder(),
          }}
        >
          <h3 
            className="text-xl font-bold mb-6 flex items-center gap-2"
            style={{ color: getTextColor(900) }}
          >
            📍 Información de Contacto
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: getCardBorder() }}>
              <span className="font-semibold" style={{ color: getTextColor(600) }}>{t('restaurant.address')}:</span>
              <span className="font-medium" style={{ color: getTextColor(800) }}>{restaurant.address}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: getCardBorder() }}>
              <span className="font-semibold" style={{ color: getTextColor(600) }}>{t('restaurant.phone')}:</span>
              <span className="font-medium" style={{ color: getTextColor(800) }}>{restaurant.phone}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: getCardBorder() }}>
              <span className="font-semibold" style={{ color: getTextColor(600) }}>{t('restaurant.email')}:</span>
              <span className="font-medium" style={{ color: getTextColor(800) }}>{restaurant.email}</span>
            </div>
            {restaurant.website && (
              <div className="flex justify-between items-center py-3">
                <span className="font-semibold" style={{ color: getTextColor(600) }}>{t('restaurant.website')}:</span>
                <span className="font-medium" style={{ color: getTextColor(800) }}>{restaurant.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Estadísticas */}
        <div 
          className="p-6 rounded-xl border shadow-lg"
          style={{
            backgroundColor: getCardBackground(),
            borderColor: getCardBorder(),
          }}
        >
          <h3 
            className="text-xl font-bold mb-6 flex items-center gap-2"
            style={{ color: getTextColor(900) }}
          >
            📊 Estadísticas
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getCardBackground()}80` }}>
              <span className="block text-3xl font-bold mb-2" style={{ color: getTextColor(900) }}>{employees.length}</span>
              <span className="block text-sm" style={{ color: getTextColor(600) }}>{t('restaurant.employees')}</span>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getCardBackground()}80` }}>
              <span className="block text-3xl font-bold mb-2" style={{ color: getTextColor(900) }}>12</span>
              <span className="block text-sm" style={{ color: getTextColor(600) }}>{t('restaurant.tables')}</span>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getCardBackground()}80` }}>
              <span className="block text-3xl font-bold mb-2" style={{ color: getTextColor(900) }}>{products.length}</span>
              <span className="block text-sm" style={{ color: getTextColor(600) }}>{t('restaurant.products')}</span>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getCardBackground()}80` }}>
              <span className="block text-3xl font-bold mb-2" style={{ color: getTextColor(900) }}>{menus.length}</span>
              <span className="block text-sm" style={{ color: getTextColor(600) }}>{t('restaurant.menus')}</span>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getCardBackground()}80` }}>
              <span className="block text-3xl font-bold mb-2" style={{ color: getTextColor(900) }}>{platos.length}</span>
              <span className="block text-sm" style={{ color: getTextColor(600) }}>{t('restaurant.platos')}</span>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div 
          className="p-6 rounded-xl border shadow-lg"
          style={{
            backgroundColor: getCardBackground(),
            borderColor: getCardBorder(),
          }}
        >
          <h3 
            className="text-xl font-bold mb-6 flex items-center gap-2"
            style={{ color: getTextColor(900) }}
          >
            📝 Descripción
          </h3>
          <p className="leading-relaxed" style={{ color: getTextColor(600) }}>
            {restaurant.description}
          </p>
        </div>

        {/* Información del Sistema */}
        <div 
          className="p-6 rounded-xl border shadow-lg"
          style={{
            backgroundColor: getCardBackground(),
            borderColor: getCardBorder(),
          }}
        >
          <h3 
            className="text-xl font-bold mb-6 flex items-center gap-2"
            style={{ color: getTextColor(900) }}
          >
            📅 Información del Sistema
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: getCardBorder() }}>
              <span className="font-semibold" style={{ color: getTextColor(600) }}>{t('restaurant.createdAt')}:</span>
              <span className="font-medium" style={{ color: getTextColor(800) }}>
                {new Date(restaurant.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="font-semibold" style={{ color: getTextColor(600) }}>{t('restaurant.status')}:</span>
              <span 
                className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                  restaurant.isActive ? '' : ''
                }`}
                style={{
                  backgroundColor: restaurant.isActive ? getSuccessColor() : getDangerColor()
                }}
              >
                {restaurant.isActive ? t('restaurant.active') : t('restaurant.inactive')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Horarios Detallados */}
      <div 
        className="p-6 rounded-xl border shadow-lg"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 
            className="text-xl font-bold"
            style={{ color: getTextColor(900) }}
          >
            📅 Horarios Detallados
          </h3>
          <Button
            variant="primary"
            onClick={handleOpenScheduleWizard}
          >
            ⏰ {t('restaurant.configureSchedules')}
          </Button>
        </div>
        
        {/* Tarjeta de resumen estética */}
        {Object.keys(schedule).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const dayNames = {
                monday: 'Lunes',
                tuesday: 'Martes', 
                wednesday: 'Miércoles',
                thursday: 'Jueves',
                friday: 'Viernes',
                saturday: 'Sábado',
                sunday: 'Domingo'
              };
              
              // Orden de los días de la semana
              const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
              
              // Filtrar y ordenar los días configurados
              const orderedDays = dayOrder
                .filter(dayKey => schedule[dayKey])
                .map(dayKey => ({ dayKey, daySchedule: schedule[dayKey] }));
              
              return orderedDays.map(({ dayKey, daySchedule }) => {
              
              const totalShifts = daySchedule.shifts?.length || 0;
              const totalEmployees = daySchedule.shifts?.reduce((total, shift) => 
                total + (shift.assignedEmployees?.length || 0), 0) || 0;
              
              return (
                <div 
                  key={dayKey}
                  className="p-6 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: getCardBackground(),
                    borderColor: getCardBorder(),
                  }}
                >
                  {/* Header de la tarjeta */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 
                        className="font-bold text-lg mb-1"
                        style={{ color: getTextColor(900) }}
                      >
                        {dayNames[dayKey as keyof typeof dayNames]}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ color: getTextColor(600) }}
                      >
                        {daySchedule.openingHours} - {daySchedule.closingHours}
                      </p>
                    </div>
                    <div className="text-right">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{ 
                          backgroundColor: getInfoColor() + '20',
                          color: getInfoColor()
                        }}
                      >
                        {totalShifts}
                      </div>
                      <p 
                        className="text-xs mt-1"
                        style={{ color: getTextColor(600) }}
                      >
                        {t('restaurant.shifts')}
                      </p>
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: getTextColor(900) }}
                      >
                        {totalShifts}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: getTextColor(600) }}
                      >
                        {t('restaurant.configuredSchedules')}
                      </div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: getTextColor(900) }}
                      >
                        {totalEmployees}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: getTextColor(600) }}
                      >
                        {t('restaurant.assignedEmployees')}
                      </div>
                    </div>
                  </div>

                  {/* Lista de turnos */}
                  {daySchedule.shifts && daySchedule.shifts.length > 0 && (
                    <div className="mb-4">
                      <h5 
                        className="text-sm font-semibold mb-2"
                        style={{ color: getTextColor(700) }}
                      >
                        {t('restaurant.shifts')}:
                      </h5>
                      <div className="space-y-2">
                        {daySchedule.shifts.map((shift, index) => (
                          <div 
                            key={shift.id}
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor: getInfoColor() + '10',
                              border: `1px solid ${getInfoColor()}20`
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <span 
                                className="text-sm font-medium"
                                style={{ color: getTextColor(800) }}
                              >
                                {shift.name}
                              </span>
                              <span 
                                className="text-xs"
                                style={{ color: getTextColor(600) }}
                              >
                                {shift.startTime} - {shift.endTime}
                              </span>
                            </div>
                            {shift.assignedEmployees && shift.assignedEmployees.length > 0 && (
                              <div 
                                className="text-xs mt-1"
                                style={{ color: getTextColor(600) }}
                              >
                                {shift.assignedEmployees.length} {t('restaurant.employee', { count: shift.assignedEmployees.length })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Botón de editar */}
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={handleOpenScheduleWizard}
                    className="w-full"
                  >
                    ✏️ {t('restaurant.editSchedules')}
                  </Button>
                </div>
              );
            });
          })()}
          </div>
        ) : (
          <div 
            className="text-center py-12 rounded-xl border-2 border-dashed"
            style={{
              backgroundColor: getCardBackground(),
              borderColor: getCardBorder(),
            }}
          >
            <div 
              className="text-6xl mb-4"
              style={{ color: getTextColor(400) }}
            >
              ⏰
            </div>
            <h4 
              className="text-lg font-semibold mb-2"
              style={{ color: getTextColor(700) }}
            >
              {t('restaurant.noSchedulesConfigured')}
            </h4>
            <p 
              className="text-sm mb-4"
              style={{ color: getTextColor(600) }}
            >
              {t('restaurant.configureWorkSchedules')}
            </p>
            <Button
              variant="primary"
              onClick={handleOpenScheduleWizard}
            >
              🚀 {t('restaurant.configureSchedules')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderEmployeesTab = () => (
    <div className="space-y-6">
      <div 
        className="p-6 rounded-xl border shadow-lg"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 
            className="text-xl font-bold"
            style={{ color: getTextColor(900) }}
          >
            👥 {t('restaurant.employees')}({employees.length})
          </h3>
          <Button
            variant="primary"
            onClick={handleOpenAddEmployeeModal}
          >
            ➕ {t('restaurant.addEmployee')}
          </Button>
        </div>

        {employees.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 
              className="text-2xl font-semibold mb-2"
              style={{ color: getTextColor(900) }}
            >
              {t('restaurant.noEmployees')}
            </h3>
            <p 
              className="text-base"
              style={{ color: getTextColor(600) }}
            >
              {t('restaurant.addEmployeesToOperate')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr 
                  className="border-b"
                  style={{ borderColor: getCardBorder() }}
                >
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.employee')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.role')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.email')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.phone')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.status')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.hired')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr 
                    key={employee.id}
                    className="border-b transition-colors duration-200 hover:bg-opacity-50"
                    style={{ 
                      borderColor: getCardBorder(),
                      backgroundColor: index % 2 === 0 ? 'transparent' : `${getCardBackground()}50`
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: getInfoColor() }}
                        >
                          <span className="text-white text-sm">👤</span>
                        </div>
                        <span 
                          className="font-semibold text-sm"
                          style={{ color: getTextColor(900) }}
                        >
                          {employee.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getInfoColor() }}
                      >
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {employee.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {employee.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          employee.isActive ? '' : ''
                        }`}
                        style={{
                          backgroundColor: employee.isActive ? getSuccessColor() : getDangerColor()
                        }}
                      >
                        {employee.isActive ? t('restaurant.active') : t('restaurant.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2 justify-center">
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.editEmployee')}
                        >
                          ✏️
                        </button>
                        <button
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          onClick={(e) => handleTransferEmployee(employee, e)}
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.transferEmployee')}
                        >
                          🔄
                        </button>
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.viewProfile')}
                        >
                          📊
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderMenusTab = () => (
    <div className="space-y-6">
      <div 
        className="p-6 rounded-xl border shadow-lg"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 
            className="text-xl font-bold"
            style={{ color: getTextColor(900) }}
          >
            🍽️ {t('restaurant.menus')}({menus.length})
          </h3>
          <Button
            variant="primary"
            onClick={handleAddMenu}
          >
            ➕ {t('restaurant.addMenu')}
          </Button>
        </div>

        {menus.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 
              className="text-2xl font-semibold mb-2"
              style={{ color: getTextColor(900) }}
            >
              {t('restaurant.noMenus')}
            </h3>
            <p 
              className="text-base"
              style={{ color: getTextColor(600) }}
            >
              {t('restaurant.addMenusToOperate')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr 
                  className="border-b"
                  style={{ borderColor: getCardBorder() }}
                >
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.menu')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.category')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.price')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.items')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.status')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.updatedAt')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu, index) => (
                  <tr 
                    key={menu.id}
                    className="border-b transition-colors duration-200 hover:bg-opacity-50"
                    style={{ 
                      borderColor: getCardBorder(),
                      backgroundColor: index % 2 === 0 ? 'transparent' : `${getCardBackground()}50`
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: getInfoColor() }}
                        >
                          <span className="text-white text-sm">🍽️</span>
                        </div>
                        <div>
                          <span 
                            className="font-semibold text-sm block"
                            style={{ color: getTextColor(900) }}
                          >
                            {menu.name}
                          </span>
                          <span 
                            className="text-xs block"
                            style={{ color: getTextColor(600) }}
                          >
                            {menu.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getInfoColor() }}
                      >
                        {menu.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {menu.price > 0 ? `$${menu.price.toLocaleString()}` : t('restaurant.free')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {menu.items} {t('restaurant.items')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          menu.isActive ? '' : ''
                        }`}
                        style={{
                          backgroundColor: menu.isActive ? getSuccessColor() : getDangerColor()
                        }}
                      >
                        {menu.isActive ? t('restaurant.active') : t('restaurant.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {new Date(menu.updatedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2 justify-center">
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          onClick={() => handleEditMenu(menu.id)}
                          title={t('restaurant.editMenu')}
                        >
                          ✏️
                        </button>
                        <button
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          onClick={() => handleToggleMenuStatus(menu.id)}
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title={menu.isActive ? t('restaurant.deactivateMenu') : t('restaurant.activateMenu')}
                        >
                          {menu.isActive ? '🔴' : '🟢'}
                        </button>
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          onClick={() => handleDeleteMenu(menu.id)}
                          style={{ 
                            color: getDangerColor(),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.deleteMenu')}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderPlatosTab = () => (
    <div className="space-y-6">
      <div 
        className="p-6 rounded-xl border shadow-lg"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 
            className="text-xl font-bold"
            style={{ color: getTextColor(900) }}
          >
            🍴 {t('restaurant.platos')}({platos.length})
          </h3>
          <Button
            variant="primary"
            onClick={handleAddPlato}
          >
            ➕ {t('restaurant.addPlato')}
          </Button>
        </div>

        {platos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍴</div>
            <h3 
              className="text-2xl font-semibold mb-2"
              style={{ color: getTextColor(900) }}
            >
              {t('restaurant.noPlatos')}
            </h3>
            <p 
              className="text-base"
              style={{ color: getTextColor(600) }}
            >
              {t('restaurant.addPlatosToOperate')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr 
                  className="border-b"
                  style={{ borderColor: getCardBorder() }}
                >
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.plato')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.category')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.price')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.ingredients')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.preparationTime')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.status')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {platos.map((plato, index) => (
                  <tr 
                    key={plato.id}
                    className="border-b transition-colors duration-200 hover:bg-opacity-50"
                    style={{ 
                      borderColor: getCardBorder(),
                      backgroundColor: 'transparent'
                    }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div 
                          className="font-medium"
                          style={{ color: getTextColor(900) }}
                        >
                          {plato.name}
                        </div>
                        <div 
                          className="text-sm"
                          style={{ color: getTextColor(600) }}
                        >
                          {plato.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: getInfoColor(),
                          color: 'white'
                        }}
                      >
                        {plato.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="font-medium"
                        style={{ color: getTextColor(900) }}
                      >
                        ${plato.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm" style={{ color: getTextColor(600) }}>
                        {plato.ingredients.length} {t('restaurant.ingredients')}
                      </div>
                      <div className="text-xs" style={{ color: getTextColor(500) }}>
                        {plato.ingredients.slice(0, 2).join(', ')}
                        {plato.ingredients.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="text-sm"
                        style={{ color: getTextColor(600) }}
                      >
                        {plato.preparationTime} {t('restaurant.minutes')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          plato.isActive ? 'text-white' : 'text-white'
                        }`}
                        style={{
                          backgroundColor: plato.isActive ? getSuccessColor() : getDangerColor()
                        }}
                      >
                        {plato.isActive ? t('restaurant.active') : t('restaurant.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleTogglePlatoStatus(plato.id)}
                          className="p-1 rounded transition-colors duration-200"
                          style={{ 
                            color: plato.isActive ? getWarningColor() : getSuccessColor(),
                            backgroundColor: 'transparent'
                          }}
                          title={plato.isActive ? t('restaurant.deactivatePlato') : t('restaurant.activatePlato')}
                        >
                          {plato.isActive ? '⏸️' : '▶️'}
                        </button>
                        <button
                          onClick={() => handleEditPlato(plato.id)}
                          className="p-1 rounded transition-colors duration-200"
                          style={{ 
                            color: getInfoColor(),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.editPlato')}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeletePlato(plato.id)}
                          className="p-1 rounded transition-colors duration-200"
                          style={{ 
                            color: getDangerColor(),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.deletePlato')}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderProductsTab = () => (
    <div className="space-y-6">
      <div 
        className="p-6 rounded-xl border shadow-lg"
        style={{
          backgroundColor: getCardBackground(),
          borderColor: getCardBorder(),
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 
            className="text-xl font-bold"
            style={{ color: getTextColor(900) }}
          >
            📦 {t('restaurant.products')}({products.length})
          </h3>
          <Button
            variant="primary"
            onClick={handleAddProduct}
          >
            ➕ {t('restaurant.addProduct')}
          </Button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 
              className="text-2xl font-semibold mb-2"
              style={{ color: getTextColor(900) }}
            >
              {t('restaurant.noProducts')}
            </h3>
            <p 
              className="text-base"
              style={{ color: getTextColor(600) }}
            >
              {t('restaurant.addProductsToOperate')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr 
                  className="border-b"
                  style={{ borderColor: getCardBorder() }}
                >
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.product')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.category')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.price')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.stock')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.preparationTime')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.status')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    {t('restaurant.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr 
                    key={product.id}
                    className="border-b transition-colors duration-200 hover:bg-opacity-50"
                    style={{ 
                      borderColor: getCardBorder(),
                      backgroundColor: index % 2 === 0 ? 'transparent' : `${getCardBackground()}50`
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: getInfoColor() }}
                        >
                          <span className="text-white text-sm">🍽️</span>
                        </div>
                        <div>
                          <span 
                            className="font-semibold text-sm block"
                            style={{ color: getTextColor(900) }}
                          >
                            {product.name}
                          </span>
                          <span 
                            className="text-xs block"
                            style={{ color: getTextColor(600) }}
                          >
                            {product.description}
                          </span>
                          {product.allergens.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {product.allergens.map((allergen, idx) => (
                                <span 
                                  key={idx}
                                  className="px-1 py-0.5 text-xs rounded bg-yellow-100 text-yellow-800"
                                  style={{ 
                                    backgroundColor: getWarningColor() + '20',
                                    color: getWarningColor()
                                  }}
                                >
                                  {allergen}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getInfoColor() }}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span 
                          className="font-semibold text-sm block"
                          style={{ color: getTextColor(900) }}
                        >
                          ${product.price.toLocaleString()}
                        </span>
                        <span 
                          className="text-xs block"
                          style={{ color: getTextColor(600) }}
                        >
                          {t('restaurant.cost')}: ${product.cost.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10 ? 'text-white' : 'text-white'
                        }`}
                        style={{
                          backgroundColor: product.stock > 10 ? getSuccessColor() : 
                                         product.stock > 0 ? getWarningColor() : getDangerColor()
                        }}
                      >
                        {product.stock} {t('restaurant.units')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ color: getTextColor(800) }}>
                        {product.preparationTime} {t('restaurant.minutes')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          product.isActive ? '' : ''
                        }`}
                        style={{
                          backgroundColor: product.isActive ? getSuccessColor() : getDangerColor()
                        }}
                      >
                        {product.isActive ? t('restaurant.active') : t('restaurant.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2 justify-center">
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          onClick={() => handleEditProduct(product.id)}
                          title={t('restaurant.editProduct')}
                        >
                          ✏️
                        </button>
                        <button
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          onClick={() => handleToggleProductStatus(product.id)}
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title={product.isActive ? t('restaurant.deactivateProduct') : t('restaurant.activateProduct')}
                        >
                          {product.isActive ? '🔴' : '🟢'}
                        </button>
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          onClick={() => handleDeleteProduct(product.id)}
                          style={{ 
                            color: getDangerColor(),
                            backgroundColor: 'transparent'
                          }}
                          title={t('restaurant.deleteProduct')}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderTablesTab = () => (
    <div 
      className="p-6 rounded-xl border shadow-lg"
      style={{
        backgroundColor: getCardBackground(),
        borderColor: getCardBorder(),
      }}
    >
      <h3 
        className="text-xl font-bold mb-4"
        style={{ color: getTextColor(900) }}
      >
        🪑 {t('restaurant.tables')}
      </h3>
      <p 
        className="text-gray-600"
        style={{ color: getTextColor(600) }}
      >
        {t('restaurant.tableManagementComingSoon')}
      </p>
    </div>
  );

  const renderStatsTab = () => (
    <div 
      className="p-6 rounded-xl border shadow-lg"
      style={{
        backgroundColor: getCardBackground(),
        borderColor: getCardBorder(),
      }}
    >
      <h3 
        className="text-xl font-bold mb-4"
        style={{ color: getTextColor(900) }}
      >
        📊 {t('restaurant.statistics')}
      </h3>
      <p 
        className="text-gray-600"
        style={{ color: getTextColor(600) }}
      >
        {t('restaurant.statisticsComingSoon')}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={handleBackToRestaurants}
          >
            {t('restaurant.backToRestaurants')}
          </Button>
          <h1 
            className="text-3xl font-bold"
            style={{ color: 'white' }}
          >
            {t('restaurant.adminPanel')}
          </h1>
        </div>
        <LanguageSelector />
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: t('restaurant.overview'), icon: '📊' },
            { id: 'employees', label: t('restaurant.employees'), icon: '👥' },
            { id: 'menus', label: t('restaurant.menus'), icon: '🍽️' },
            { id: 'platos', label: t('restaurant.platos'), icon: '🍴' },
            { id: 'products', label: t('restaurant.products'), icon: '📦' },
            { id: 'tables', label: t('restaurant.tables'), icon: '🪑' },
            { id: 'stats', label: t('restaurant.statistics'), icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? getInfoColor() : 'transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'employees' && renderEmployeesTab()}
        {activeTab === 'menus' && renderMenusTab()}
        {activeTab === 'platos' && renderPlatosTab()}
        {activeTab === 'products' && renderProductsTab()}
        {activeTab === 'tables' && renderTablesTab()}
        {activeTab === 'stats' && renderStatsTab()}
      </div>

      {/* Modals */}
      {transferModalOpen && selectedEmployee && (
        <EmployeeTransferModal
          isOpen={transferModalOpen}
          onClose={handleCloseTransferModal}
          employee={selectedEmployee}
        />
      )}

      {shiftAssignmentModalOpen && newShiftData && (
        <ShiftAssignmentModal
          isOpen={shiftAssignmentModalOpen}
          onClose={handleCloseShiftAssignmentModal}
          onAssignEmployees={handleAssignEmployeesToNewShift}
          shiftName={newShiftData.shiftName}
          dayName={newShiftData.dayName}
          employees={employees}
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
