import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import EmployeeTransferModal from '../components/restaurant/EmployeeTransferModal';
import ShiftAssignmentModal from '../components/restaurant/ShiftAssignmentModal';

const RestaurantManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurantById, getEmployeesByRestaurant, clearAndReload } = useRestaurantStore();
  
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
      const foundRestaurant = getRestaurantById(id);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        const restaurantEmployees = getEmployeesByRestaurant(id);
        console.log('Empleados cargados:', restaurantEmployees.length);
        const uniqueRoles = restaurantEmployees.map(emp => emp.role).filter((role, index, arr) => arr.indexOf(role) === index);
        console.log('Roles disponibles:', uniqueRoles);
        setEmployees(restaurantEmployees);
      } else {
        // Si no se encuentra el restaurante, redirigir
        navigate('/restaurants');
      }
    }
  }, [id, getRestaurantById, getEmployeesByRestaurant, navigate]);

  if (!restaurant) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando restaurante...</p>
      </div>
    );
  }

  const handleBackToRestaurants = () => {
    navigate('/restaurants');
  };

  const handleEditRestaurant = () => {
    // TODO: Implementar edición
    console.log('Editar restaurante:', restaurant.id);
  };

  const handleToggleStatus = () => {
    // TODO: Implementar cambio de estado
    console.log('Cambiar estado del restaurante:', restaurant.id);
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

  // Funciones para manejar horarios detallados
  const handleAddShift = (day: string) => {
    const newShift = {
      id: `${day}-shift-${Date.now()}`,
      name: 'Nuevo Turno',
      startTime: '08:00',
      endTime: '12:00',
      assignedEmployees: []
    };

    setDetailedSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        shifts: [...prev[day as keyof typeof prev].shifts, newShift]
      }
    }));
  };

  const handleOpenAssignmentModal = (day: string, shiftId: string) => {
    // Mapear nombres de días para mostrar en el modal
    const dayNames: { [key: string]: string } = {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo'
    };

    // Obtener el turno actual
    const currentShift = detailedSchedule[day as keyof typeof detailedSchedule].shifts.find(
      shift => shift.id === shiftId
    );

    if (currentShift) {
      // Configurar datos del turno para el modal
      const shiftData = {
        day,
        shiftId,
        shiftName: currentShift.name,
        dayName: dayNames[day]
      };
      
      console.log('📝 Datos del turno configurados:', shiftData);
      setNewShiftData(shiftData);
      setShiftAssignmentModalOpen(true);
      console.log('✅ Modal abierto - shiftAssignmentModalOpen:', true);
    }
  };

  const handleUpdateShift = (day: string, shiftId: string, field: string, value: any) => {
    setDetailedSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        shifts: prev[day as keyof typeof prev].shifts.map(shift => 
          shift.id === shiftId 
            ? { ...shift, [field]: value }
            : shift
        )
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

  // Función para calcular horas de trabajo
  const calculateWorkHours = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.max(0, diffHours);
  };



  // Función para actualizar horarios de apertura y cierre
  const handleUpdateDayHours = (day: string, field: 'openingHours' | 'closingHours', value: string) => {
    setDetailedSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  // Función para calcular el progreso de cobertura de turnos
  const calculateShiftCoverage = (day: string) => {
    const daySchedule = detailedSchedule[day as keyof typeof detailedSchedule];
    const openingTime = daySchedule.openingHours;
    const closingTime = daySchedule.closingHours;
    
    // Convertir horarios a minutos para facilitar cálculos
    const openingMinutes = parseInt(openingTime.split(':')[0]) * 60 + parseInt(openingTime.split(':')[1]);
    const closingMinutes = parseInt(closingTime.split(':')[0]) * 60 + parseInt(closingTime.split(':')[1]);
    const totalDayMinutes = closingMinutes - openingMinutes;
    
    if (totalDayMinutes <= 0) return 0;
    
    // Calcular minutos cubiertos por turnos
    let coveredMinutes = 0;
    daySchedule.shifts.forEach(shift => {
      const shiftStartMinutes = parseInt(shift.startTime.split(':')[0]) * 60 + parseInt(shift.startTime.split(':')[1]);
      const shiftEndMinutes = parseInt(shift.endTime.split(':')[0]) * 60 + parseInt(shift.endTime.split(':')[1]);
      
      // Solo contar la parte que está dentro del horario de apertura/cierre
      const effectiveStart = Math.max(shiftStartMinutes, openingMinutes);
      const effectiveEnd = Math.min(shiftEndMinutes, closingMinutes);
      
      if (effectiveEnd > effectiveStart) {
        coveredMinutes += effectiveEnd - effectiveStart;
      }
    });
    
    return Math.min((coveredMinutes / totalDayMinutes) * 100, 100);
  };

  // Funciones para manejar el modal de asignación de empleados
  const handleCloseShiftAssignmentModal = () => {
    setShiftAssignmentModalOpen(false);
    setNewShiftData(null);
  };

  const handleAssignEmployeesToNewShift = (employeeIds: string[]) => {
    if (!newShiftData) return;

    const { day, shiftId, shiftName } = newShiftData;
    
    if (shiftId) {
      // Actualizar turno existente con los empleados asignados
      setDetailedSchedule(prev => ({
        ...prev,
        [day]: {
          ...prev[day as keyof typeof prev],
          shifts: prev[day as keyof typeof prev].shifts.map(shift => 
            shift.id === shiftId 
              ? { ...shift, assignedEmployees: employeeIds }
              : shift
          )
        }
      }));
    } else {
      // Crear nuevo turno con los empleados asignados
      const newShift = {
        id: `${day}-shift-${Date.now()}`,
        name: shiftName,
        startTime: '08:00',
        endTime: '12:00',
        assignedEmployees: employeeIds
      };

      // Agregar el turno al horario
      setDetailedSchedule(prev => ({
        ...prev,
        [day]: {
          ...prev[day as keyof typeof prev],
          shifts: [...prev[day as keyof typeof prev].shifts, newShift]
        }
      }));
    }

    // Cerrar el modal
    handleCloseShiftAssignmentModal();
  };

  const renderOverviewTab = () => (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-amber-700 text-xl font-bold mb-6 flex items-center gap-2">📍 Información de Contacto</h3>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="font-semibold text-gray-600">Dirección:</span>
            <span className="text-gray-800 font-medium">{restaurant.address}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="font-semibold text-gray-600">Teléfono:</span>
            <span className="text-gray-800 font-medium">{restaurant.phone}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="text-gray-800 font-medium">{restaurant.email}</span>
          </div>
          {restaurant.website && (
            <div className="flex justify-between items-center py-3">
              <span className="font-semibold text-gray-600">Sitio Web:</span>
              <span className="text-gray-800 font-medium">{restaurant.website}</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-amber-700 text-xl font-bold mb-6 flex items-center gap-2">📊 Estadísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
              <span className="block text-3xl font-bold text-amber-700">{employees.length}</span>
              <span className="block text-sm text-gray-600 mt-2">Empleados</span>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
              <span className="block text-3xl font-bold text-amber-700">12</span>
              <span className="block text-sm text-gray-600 mt-2">Mesas</span>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
              <span className="block text-3xl font-bold text-amber-700">45</span>
              <span className="block text-sm text-gray-600 mt-2">Productos</span>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
              <span className="block text-3xl font-bold text-amber-700">8</span>
              <span className="block text-sm text-gray-600 mt-2">Menús</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-amber-700 text-xl font-bold mb-6 flex items-center gap-2">📝 Descripción</h3>
          <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-amber-700 text-xl font-bold mb-6 flex items-center gap-2">📅 Información del Sistema</h3>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="font-semibold text-gray-600">Creado:</span>
            <span className="text-gray-800 font-medium">
              {new Date(restaurant.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="font-semibold text-gray-600">Estado:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              restaurant.isActive 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
            }`}>
              {restaurant.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>

      {/* Sección para horarios detallados */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h3 className="text-amber-700 text-2xl font-bold mb-8 text-center">📅 Horarios Detallados con Asignación de Empleados</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(detailedSchedule).map(([day, daySchedule]) => (
            <div key={day} className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <h4 className="text-gray-800 text-xl font-bold">
                  {day === 'monday' && 'Lunes'}
                  {day === 'tuesday' && 'Martes'}
                  {day === 'wednesday' && 'Miércoles'}
                  {day === 'thursday' && 'Jueves'}
                  {day === 'friday' && 'Viernes'}
                  {day === 'saturday' && 'Sábado'}
                  {day === 'sunday' && 'Domingo'}
                </h4>
                <button 
                  className="bg-blue-500 text-white border-none py-2 px-4 rounded-lg cursor-pointer font-semibold text-sm transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={() => handleAddShift(day)}
                >
                  ➕ Agregar Turno
                </button>
              </div>
              
              {/* Horarios de apertura y cierre */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                <h5 className="mb-3 text-gray-700 text-sm font-semibold">🕐 Horarios del Restaurante:</h5>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-600 font-medium">Apertura:</label>
                    <input
                      type="time"
                      value={daySchedule.openingHours}
                      onChange={(e) => handleUpdateDayHours(day, 'openingHours', e.target.value)}
                      className="p-2 border border-gray-300 rounded-md text-sm bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-600 font-medium">Cierre:</label>
                    <input
                      type="time"
                      value={daySchedule.closingHours}
                      onChange={(e) => handleUpdateDayHours(day, 'closingHours', e.target.value)}
                      className="p-2 border border-gray-300 rounded-md text-sm bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                {daySchedule.shifts.map((shift) => (
                  <div key={shift.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <input
                        type="text"
                        value={shift.name}
                        onChange={(e) => handleUpdateShift(day, shift.id, 'name', e.target.value)}
                        className="flex-1 p-2 border-2 border-gray-200 rounded-md text-base font-semibold text-gray-800 bg-white transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Nombre del turno"
                      />
                      <button 
                        className="bg-none border-none p-2 rounded-md cursor-pointer text-lg text-red-500 transition-all duration-300 hover:bg-red-50 hover:scale-110"
                        onClick={() => handleRemoveShift(day, shift.id)}
                      >
                        🗑️
                      </button>
                    </div>
                    
                    <div className="flex gap-4 items-center mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-col gap-1">
                        <label className="font-semibold text-amber-700 text-sm">Inicio:</label>
                        <input
                          type="time"
                          value={shift.startTime}
                          onChange={(e) => handleUpdateShift(day, shift.id, 'startTime', e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-md text-sm font-medium text-gray-800 bg-white transition-all duration-300 focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-semibold text-amber-700 text-sm">Fin:</label>
                        <input
                          type="time"
                          value={shift.endTime}
                          onChange={(e) => handleUpdateShift(day, shift.id, 'endTime', e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-md text-sm font-medium text-gray-800 bg-white transition-all duration-300 focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200"
                        />
                      </div>
                      <div className="ml-auto">
                        <span className={`px-3 py-1 rounded-full font-bold text-sm ${
                          calculateWorkHours(shift.startTime, shift.endTime) > 9 
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                        }`}>
                          {calculateWorkHours(shift.startTime, shift.endTime).toFixed(1)}h
                        </span>
                      </div>
                    </div>
                    
                    {/* Botón para abrir modal de asignación de empleados */}
                    <div className="text-center my-4">
                      <button 
                        className="bg-gray-600 text-white border-none py-3 px-6 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-300 shadow-md hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                        onClick={() => handleOpenAssignmentModal(day, shift.id)}
                      >
                        👥 Asignar Empleados
                      </button>
                    </div>
                    
                    {calculateWorkHours(shift.startTime, shift.endTime) > 9 && (
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-lg font-semibold text-sm text-center mb-4">
                        ⚠️ Máximo 9 horas permitidas
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Barra de progreso de cobertura de turnos */}
              <div className="bg-gray-50 rounded-lg p-4 mt-4 border border-gray-200">
                <h5 className="mb-3 text-gray-700 text-sm font-semibold">📊 Cobertura de Turnos:</h5>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 relative"
                      style={{ width: `${calculateShiftCoverage(day)}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 font-semibold min-w-20 text-right">
                    {calculateShiftCoverage(day).toFixed(1)}% cubierto
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmployeesTab = () => (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-amber-700 text-2xl font-bold">👥 Empleados ({employees.length})</h2>
        <button className="bg-gradient-to-r from-amber-700 to-amber-600 text-white border-none rounded-lg py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          ➕ Agregar Empleado
        </button>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-12 px-8 text-gray-600">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-amber-700 text-2xl font-semibold mb-2">No hay empleados en este restaurante</h3>
          <p className="text-gray-600 text-base">Agrega empleados para comenzar a operar</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-amber-700 to-amber-600 text-white">
                <th className="p-4 text-left font-semibold border-b-2 border-gray-200">Empleado</th>
                <th className="p-4 text-left font-semibold border-b-2 border-gray-200">Rol</th>
                <th className="p-4 text-left font-semibold border-b-2 border-gray-200">Email</th>
                <th className="p-4 text-left font-semibold border-b-2 border-gray-200">Teléfono</th>
                <th className="p-4 text-left font-semibold border-b-2 border-gray-200">Estado</th>
                <th className="p-4 text-left font-semibold border-b-2 border-gray-200">Contratado</th>
                <th className="p-4 text-left font-semibold border-b-2 border-gray-200">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-200 transition-colors duration-200 hover:bg-gray-50">
                  <td className="p-3 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">👤</span>
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{employee.name}</span>
                    </div>
                  </td>
                  <td className="p-3 align-middle">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {employee.role}
                    </span>
                  </td>
                  <td className="p-3 align-middle text-gray-800">{employee.email}</td>
                  <td className="p-3 align-middle text-gray-800">{employee.phone}</td>
                  <td className="p-3 align-middle">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      employee.isActive 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                        : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    }`}>
                      {employee.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="p-3 align-middle text-gray-800">
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 align-middle">
                    <div className="flex gap-2 justify-center">
                      <button className="bg-none border-none p-2 rounded-md cursor-pointer text-base text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-amber-700 hover:scale-110" title="Editar empleado">✏️</button>
                      <button
                        className="bg-none border-none p-2 rounded-md cursor-pointer text-base text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-amber-700 hover:scale-110"
                        onClick={(e) => handleTransferEmployee(employee, e)}
                        title="Transferir empleado"
                      >
                        🔄
                      </button>
                      <button className="bg-none border-none p-2 rounded-md cursor-pointer text-base text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-amber-700 hover:scale-110" title="Ver perfil">📊</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderMenusTab = () => (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-amber-700 text-2xl font-bold">🍽️ Menús</h2>
        <button className="bg-gradient-to-r from-amber-700 to-amber-600 text-white border-none rounded-lg py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          ➕ Crear Menú
        </button>
      </div>
      
      <div className="text-center py-12 px-8 text-gray-600">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-amber-700 text-2xl font-semibold mb-2">No hay menús creados</h3>
        <p className="text-gray-600 text-base">Crea menús para tu restaurante</p>
      </div>
    </div>
  );

  const renderProductsTab = () => (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-amber-700 text-2xl font-bold">🛍️ Productos</h2>
        <button className="bg-gradient-to-r from-amber-700 to-amber-600 text-white border-none rounded-lg py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          ➕ Agregar Producto
        </button>
      </div>
      
      <div className="text-center py-12 px-8 text-gray-600">
        <div className="text-6xl mb-4">🛍️</div>
        <h3 className="text-amber-700 text-2xl font-semibold mb-2">No hay productos registrados</h3>
        <p className="text-gray-600 text-base">Agrega productos a tu inventario</p>
      </div>
    </div>
  );

  const renderTablesTab = () => (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-amber-700 text-2xl font-bold">🪑 Mesas</h2>
        <button className="bg-gradient-to-r from-amber-700 to-amber-600 text-white border-none rounded-lg py-3 px-6 text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          ➕ Agregar Mesa
        </button>
      </div>
      
      <div className="text-center py-12 px-8 text-gray-600">
        <div className="text-6xl mb-4">🪑</div>
        <h3 className="text-amber-700 text-2xl font-semibold mb-2">No hay mesas configuradas</h3>
        <p className="text-gray-600 text-base">Configura las mesas de tu restaurante</p>
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-amber-700 text-2xl font-bold">📊 Estadísticas</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-gray-600 text-base font-semibold mb-4">Ventas del Día</h3>
          <div className="text-3xl font-bold text-amber-700 mb-2">$1,250</div>
          <div className="text-green-600 text-sm font-medium">+12% vs ayer</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-gray-600 text-base font-semibold mb-4">Órdenes Pendientes</h3>
          <div className="text-3xl font-bold text-amber-700 mb-2">8</div>
          <div className="text-gray-600 text-sm font-medium">Sin cambios</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-gray-600 text-base font-semibold mb-4">Clientes Atendidos</h3>
          <div className="text-3xl font-bold text-amber-700 mb-2">45</div>
          <div className="text-green-600 text-sm font-medium">+5 vs ayer</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-gray-600 text-base font-semibold mb-4">Producto Más Vendido</h3>
          <div className="text-3xl font-bold text-amber-700 mb-2">Hamburguesa Clásica</div>
          <div className="text-green-600 text-sm font-medium">23 ventas</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="flex justify-between items-center mb-8 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex gap-4">
          <button 
            className="bg-gradient-to-r from-amber-700 to-amber-600 text-white border-none py-3 px-6 rounded-lg cursor-pointer font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={handleBackToRestaurants}
          >
            ← Volver a Mis Restaurantes
          </button>
        </div>
        <div className="flex gap-4">
          <button 
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none py-3 px-6 rounded-lg cursor-pointer font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={handleEditRestaurant}
          >
            ✏️ Editar Restaurante
          </button>
          <button 
            className={`border-none py-3 px-6 rounded-lg cursor-pointer font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
              restaurant.isOpen 
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
            }`}
            onClick={handleToggleStatus}
          >
            {restaurant.isOpen ? '🔴 Cerrar' : '🟢 Abrir'} Restaurante
          </button>
          <button 
            className="bg-red-500 text-white border-none py-3 px-6 rounded-lg cursor-pointer font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={clearAndReload}
          >
            🔄 Limpiar Cache
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex bg-gray-50 border-b border-gray-200 overflow-x-auto">
          <button 
            className={`border-none py-4 px-6 cursor-pointer font-medium transition-all duration-200 whitespace-nowrap border-b-3 border-transparent hover:bg-gray-200 hover:text-gray-700 ${
              activeTab === 'overview' 
                ? 'bg-white text-amber-700 border-b-amber-700' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Resumen
          </button>
          <button 
            className={`border-none py-4 px-6 cursor-pointer font-medium transition-all duration-200 whitespace-nowrap border-b-3 border-transparent hover:bg-gray-200 hover:text-gray-700 ${
              activeTab === 'employees' 
                ? 'bg-white text-amber-700 border-b-amber-700' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('employees')}
          >
            👥 Empleados
          </button>
          <button 
            className={`border-none py-4 px-6 cursor-pointer font-medium transition-all duration-200 whitespace-nowrap border-b-3 border-transparent hover:bg-gray-200 hover:text-gray-700 ${
              activeTab === 'menus' 
                ? 'bg-white text-amber-700 border-b-amber-700' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('menus')}
          >
            🍽️ Menús
          </button>
          <button 
            className={`border-none py-4 px-6 cursor-pointer font-medium transition-all duration-200 whitespace-nowrap border-b-3 border-transparent hover:bg-gray-200 hover:text-gray-700 ${
              activeTab === 'products' 
                ? 'bg-white text-amber-700 border-b-amber-700' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('products')}
          >
            🛍️ Productos
          </button>
          <button 
            className={`border-none py-4 px-6 cursor-pointer font-medium transition-all duration-200 whitespace-nowrap border-b-3 border-transparent hover:bg-gray-200 hover:text-gray-700 ${
              activeTab === 'tables' 
                ? 'bg-white text-amber-700 border-b-amber-700' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('tables')}
          >
            🪑 Mesas
          </button>
          <button 
            className={`border-none py-4 px-6 cursor-pointer font-medium transition-all duration-200 whitespace-nowrap border-b-3 border-transparent hover:bg-gray-200 hover:text-gray-700 ${
              activeTab === 'stats' 
                ? 'bg-white text-amber-700 border-b-amber-700' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Estadísticas
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'employees' && renderEmployeesTab()}
          {activeTab === 'menus' && renderMenusTab()}
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'tables' && renderTablesTab()}
          {activeTab === 'stats' && renderStatsTab()}
        </div>
      </div>

      {selectedEmployee && (
        <EmployeeTransferModal
          employee={selectedEmployee}
          isOpen={transferModalOpen}
          onClose={handleCloseTransferModal}
        />
      )}

      {newShiftData && (
        <ShiftAssignmentModal
          isOpen={shiftAssignmentModalOpen}
          onClose={handleCloseShiftAssignmentModal}
          onAssignEmployees={handleAssignEmployeesToNewShift}
          shiftName={newShiftData.shiftName}
          dayName={newShiftData.dayName}
        />
      )}
    </div>
  );
};

export default RestaurantManagement;
