import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import EmployeeTransferModal from '../components/restaurant/EmployeeTransferModal';
import ShiftAssignmentModal from '../components/restaurant/ShiftAssignmentModal';
import AddEmployeeModal from '../components/restaurant/AddEmployeeModal';
import Button from '../components/buttons/Button';
import { useThemeColors } from '../hooks/useThemeColors';

const RestaurantManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurantById, getEmployeesByRestaurant, clearAndReload } = useRestaurantStore();
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

  // Estado para horarios detallados con empleados asignados
  const [detailedSchedule, setDetailedSchedule] = useState({
    monday: {
      openingHours: '08:00',
      closingHours: '22:00',
      shifts: [
        {
          id: 'monday-morning',
          name: 'Mañana',
          startTime: '08:00',
          endTime: '12:00',
          assignedEmployees: [] // Array de IDs de empleados asignados
        }
      ]
    },
    tuesday: {
      openingHours: '08:00',
      closingHours: '22:00',
      shifts: [
        {
          id: 'tuesday-morning',
          name: 'Mañana',
          startTime: '08:00',
          endTime: '12:00',
          assignedEmployees: []
        }
      ]
    },
    wednesday: {
      openingHours: '08:00',
      closingHours: '22:00',
      shifts: [
        {
          id: 'wednesday-morning',
          name: 'Mañana',
          startTime: '08:00',
          endTime: '12:00',
          assignedEmployees: []
        }
      ]
    },
    thursday: {
      openingHours: '08:00',
      closingHours: '22:00',
      shifts: [
        {
          id: 'thursday-morning',
          name: 'Mañana',
          startTime: '08:00',
          endTime: '12:00',
          assignedEmployees: []
        }
      ]
    },
    friday: {
      openingHours: '08:00',
      closingHours: '22:00',
      shifts: [
        {
          id: 'friday-morning',
          name: 'Mañana',
          startTime: '08:00',
          endTime: '12:00',
          assignedEmployees: []
        }
      ]
    },
    saturday: {
      openingHours: '08:00',
      closingHours: '22:00',
      shifts: [
        {
          id: 'saturday-morning',
          name: 'Mañana',
          startTime: '08:00',
          endTime: '12:00',
          assignedEmployees: []
        }
      ]
    },
    sunday: {
      openingHours: '08:00',
      closingHours: '22:00',
      shifts: [
        {
          id: 'sunday-morning',
          name: 'Mañana',
          startTime: '08:00',
          endTime: '12:00',
          assignedEmployees: []
        }
      ]
    }
  });

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

    setDetailedSchedule(prev => ({
      ...prev,
      [day]: {
        ...daySchedule,
        shifts: [...daySchedule.shifts, newShift]
      }
    }));
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
      setDetailedSchedule(prev => ({
        ...prev,
        [newShiftData.day]: {
          ...prev[newShiftData.day as keyof typeof prev],
          shifts: prev[newShiftData.day as keyof typeof prev].shifts.map(shift => {
            if (shift.id === newShiftData.shiftId) {
              return {
                ...shift,
                assignedEmployees: employeeIds
              };
            }
            return shift;
          })
        }
      }));
    }
  };

  const handleUpdateShift = (day: string, shiftId: string, field: string, value: any) => {
    setDetailedSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        shifts: prev[day as keyof typeof prev].shifts.map(shift => {
          if (shift.id === shiftId) {
            return {
              ...shift,
              [field]: value
            };
          }
          return shift;
        })
      }
    }));
  };

  const handleRemoveShift = (day: string, shiftId: string) => {
    setDetailedSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        shifts: prev[day as keyof typeof prev].shifts.filter(shift => shift.id !== shiftId)
      }
    }));
  };

  const calculateWorkHours = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours;
  };

  const handleUpdateDayHours = (day: string, field: 'openingHours' | 'closingHours', value: string) => {
    setDetailedSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
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
              <span className="font-semibold" style={{ color: getTextColor(600) }}>Dirección:</span>
              <span className="font-medium" style={{ color: getTextColor(800) }}>{restaurant.address}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: getCardBorder() }}>
              <span className="font-semibold" style={{ color: getTextColor(600) }}>Teléfono:</span>
              <span className="font-medium" style={{ color: getTextColor(800) }}>{restaurant.phone}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: getCardBorder() }}>
              <span className="font-semibold" style={{ color: getTextColor(600) }}>Email:</span>
              <span className="font-medium" style={{ color: getTextColor(800) }}>{restaurant.email}</span>
            </div>
            {restaurant.website && (
              <div className="flex justify-between items-center py-3">
                <span className="font-semibold" style={{ color: getTextColor(600) }}>Sitio Web:</span>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getCardBackground()}80` }}>
              <span className="block text-3xl font-bold mb-2" style={{ color: getTextColor(900) }}>{employees.length}</span>
              <span className="block text-sm" style={{ color: getTextColor(600) }}>Empleados</span>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getCardBackground()}80` }}>
              <span className="block text-3xl font-bold mb-2" style={{ color: getTextColor(900) }}>12</span>
              <span className="block text-sm" style={{ color: getTextColor(600) }}>Mesas</span>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getCardBackground()}80` }}>
              <span className="block text-3xl font-bold mb-2" style={{ color: getTextColor(900) }}>45</span>
              <span className="block text-sm" style={{ color: getTextColor(600) }}>Productos</span>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${getCardBackground()}80` }}>
              <span className="block text-3xl font-bold mb-2" style={{ color: getTextColor(900) }}>8</span>
              <span className="block text-sm" style={{ color: getTextColor(600) }}>Menús</span>
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
              <span className="font-semibold" style={{ color: getTextColor(600) }}>Creado:</span>
              <span className="font-medium" style={{ color: getTextColor(800) }}>
                {new Date(restaurant.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="font-semibold" style={{ color: getTextColor(600) }}>Estado:</span>
              <span 
                className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                  restaurant.isActive ? '' : ''
                }`}
                style={{
                  backgroundColor: restaurant.isActive ? getSuccessColor() : getDangerColor()
                }}
              >
                {restaurant.isActive ? 'Activo' : 'Inactivo'}
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
        <h3 
          className="text-xl font-bold mb-6"
          style={{ color: getTextColor(900) }}
        >
          📅 Horarios Detallados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(detailedSchedule).map(([day, daySchedule]) => (
            <div 
              key={day}
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: getCardBackground(),
                borderColor: getCardBorder(),
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 
                  className="font-semibold text-lg"
                  style={{ color: getTextColor(900) }}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </h4>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => handleAddShift(day)}
                >
                  ➕ Agregar Turno
                </Button>
              </div>

              {/* Horarios de Apertura y Cierre */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <label 
                    className="block text-xs font-medium mb-1"
                    style={{ color: getTextColor(700) }}
                  >
                    Apertura
                  </label>
                  <input
                    type="time"
                    value={daySchedule.openingHours}
                    onChange={(e) => handleUpdateDayHours(day, 'openingHours', e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded"
                    style={{
                      backgroundColor: getCardBackground(),
                      borderColor: getCardBorder(),
                      color: getTextColor(900),
                    }}
                  />
                </div>
                <div>
                  <label 
                    className="block text-xs font-medium mb-1"
                    style={{ color: getTextColor(700) }}
                  >
                    Cierre
                  </label>
                  <input
                    type="time"
                    value={daySchedule.closingHours}
                    onChange={(e) => handleUpdateDayHours(day, 'closingHours', e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded"
                    style={{
                      backgroundColor: getCardBackground(),
                      borderColor: getCardBorder(),
                      color: getTextColor(900),
                    }}
                  />
                </div>
              </div>

              {/* Barra de Progreso */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: getTextColor(600) }}>Cobertura de Turnos</span>
                  <span style={{ color: getTextColor(600) }}>{Math.round(calculateShiftCoverage(day))}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${calculateShiftCoverage(day)}%`,
                      backgroundColor: getInfoColor()
                    }}
                  ></div>
                </div>
              </div>

              {/* Turnos */}
              <div className="space-y-3">
                {daySchedule.shifts.map((shift) => (
                  <div 
                    key={shift.id}
                    className="p-3 rounded-lg border"
                    style={{
                      backgroundColor: getCardBackground(),
                      borderColor: getCardBorder(),
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h5 
                        className="font-medium"
                        style={{ color: getTextColor(900) }}
                      >
                        {shift.name}
                      </h5>
                      <button
                        onClick={() => handleRemoveShift(day, shift.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <label 
                          className="block text-xs font-medium mb-1"
                          style={{ color: getTextColor(700) }}
                        >
                          Inicio
                        </label>
                        <input
                          type="time"
                          value={shift.startTime}
                          onChange={(e) => handleUpdateShift(day, shift.id, 'startTime', e.target.value)}
                          className="w-full px-2 py-1 text-xs border rounded"
                          style={{
                            backgroundColor: getCardBackground(),
                            borderColor: getCardBorder(),
                            color: getTextColor(900),
                          }}
                        />
                      </div>
                      <div>
                        <label 
                          className="block text-xs font-medium mb-1"
                          style={{ color: getTextColor(700) }}
                        >
                          Fin
                        </label>
                        <input
                          type="time"
                          value={shift.endTime}
                          onChange={(e) => handleUpdateShift(day, shift.id, 'endTime', e.target.value)}
                          className="w-full px-2 py-1 text-xs border rounded"
                          style={{
                            backgroundColor: getCardBackground(),
                            borderColor: getCardBorder(),
                            color: getTextColor(900),
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span 
                        className="text-xs"
                        style={{ color: getTextColor(600) }}
                      >
                        {calculateWorkHours(shift.startTime, shift.endTime)}h
                      </span>
                                             <Button
                         variant="accent"
                         size="small"
                         onClick={() => handleOpenAssignmentModal(day, shift.id)}
                       >
                         👥 Asignar Empleados
                       </Button>
                    </div>

                    {/* Empleados Asignados */}
                    {shift.assignedEmployees.length > 0 && (
                      <div className="mt-2 pt-2 border-t">
                        <span 
                          className="text-xs font-medium"
                          style={{ color: getTextColor(700) }}
                        >
                          Empleados: {shift.assignedEmployees.length}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
            👥 Empleados ({employees.length})
          </h3>
          <Button
            variant="primary"
            onClick={handleOpenAddEmployeeModal}
          >
            ➕ Agregar Empleado
          </Button>
        </div>

        {employees.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 
              className="text-2xl font-semibold mb-2"
              style={{ color: getTextColor(900) }}
            >
              No hay empleados en este restaurante
            </h3>
            <p 
              className="text-base"
              style={{ color: getTextColor(600) }}
            >
              Agrega empleados para comenzar a operar
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
                    Empleado
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    Rol
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    Email
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    Teléfono
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    Estado
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    Contratado
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: getTextColor(700) }}
                  >
                    Acciones
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
                        {employee.isActive ? 'Activo' : 'Inactivo'}
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
                          title="Editar empleado"
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
                          title="Transferir empleado"
                        >
                          🔄
                        </button>
                        <button 
                          className="p-2 rounded-md cursor-pointer text-base transition-all duration-200 hover:scale-110"
                          style={{ 
                            color: getTextColor(600),
                            backgroundColor: 'transparent'
                          }}
                          title="Ver perfil"
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
        🍽️ Menús
      </h3>
      <p 
        className="text-gray-600"
        style={{ color: getTextColor(600) }}
      >
        Gestión de menús próximamente...
      </p>
    </div>
  );

  const renderProductsTab = () => (
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
        📦 Productos
      </h3>
      <p 
        className="text-gray-600"
        style={{ color: getTextColor(600) }}
      >
        Gestión de productos próximamente...
      </p>
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
        🪑 Mesas
      </h3>
      <p 
        className="text-gray-600"
        style={{ color: getTextColor(600) }}
      >
        Gestión de mesas próximamente...
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
        📊 Estadísticas
      </h3>
      <p 
        className="text-gray-600"
        style={{ color: getTextColor(600) }}
      >
        Estadísticas próximamente...
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
            ← Volver
          </Button>
          <h1 
            className="text-3xl font-bold"
            style={{ color: 'white' }}
          >
            Panel de Administración
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: '📊 Resumen', icon: '📊' },
            { id: 'employees', label: '👥 Empleados', icon: '👥' },
            { id: 'menus', label: '🍽️ Menús', icon: '🍽️' },
            { id: 'products', label: '📦 Productos', icon: '📦' },
            { id: 'tables', label: '🪑 Mesas', icon: '🪑' },
            { id: 'stats', label: '📈 Estadísticas', icon: '📈' }
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
        />
      )}

      <AddEmployeeModal
        isOpen={addEmployeeModalOpen}
        onClose={handleCloseAddEmployeeModal}
        onAddEmployee={handleAddEmployee}
      />
    </div>
  );
};

export default RestaurantManagement;
