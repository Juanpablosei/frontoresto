import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import EmployeeTransferModal from '../components/restaurant/EmployeeTransferModal';
import ShiftAssignmentModal from '../components/restaurant/ShiftAssignmentModal';
import './RestaurantManagement.css';

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
    <div className="overview-section">
      <div className="restaurant-details-grid">
        <div className="detail-card">
          <h3>📍 Información de Contacto</h3>
          <div className="detail-item">
            <span className="detail-label">Dirección:</span>
            <span className="detail-value">{restaurant.address}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Teléfono:</span>
            <span className="detail-value">{restaurant.phone}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{restaurant.email}</span>
          </div>
          {restaurant.website && (
            <div className="detail-item">
              <span className="detail-label">Sitio Web:</span>
              <span className="detail-value">{restaurant.website}</span>
            </div>
          )}
        </div>

        <div className="detail-card">
          <h3>📊 Estadísticas</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{employees.length}</span>
              <span className="stat-label">Empleados</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Mesas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">45</span>
              <span className="stat-label">Productos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Menús</span>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h3>📝 Descripción</h3>
          <p className="restaurant-description-large">{restaurant.description}</p>
        </div>

        <div className="detail-card">
          <h3>📅 Información del Sistema</h3>
          <div className="detail-item">
            <span className="detail-label">Creado:</span>
            <span className="detail-value">
              {new Date(restaurant.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Estado:</span>
            <span className={`status-badge ${restaurant.isActive ? 'active' : 'inactive'}`}>
              {restaurant.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>

      {/* Sección para horarios detallados */}
      <div className="detailed-schedule-section">
        <h3>📅 Horarios Detallados con Asignación de Empleados</h3>
        <div className="schedule-grid">
          {Object.entries(detailedSchedule).map(([day, daySchedule]) => (
            <div key={day} className="day-schedule-card">
              <div className="day-header">
                <h4 className="day-title">
                  {day === 'monday' && 'Lunes'}
                  {day === 'tuesday' && 'Martes'}
                  {day === 'wednesday' && 'Miércoles'}
                  {day === 'thursday' && 'Jueves'}
                  {day === 'friday' && 'Viernes'}
                  {day === 'saturday' && 'Sábado'}
                  {day === 'sunday' && 'Domingo'}
                </h4>
                <button 
                  className="add-shift-btn"
                  onClick={() => handleAddShift(day)}
                >
                  ➕ Agregar Turno
                </button>
              </div>
              
              {/* Horarios de apertura y cierre */}
              <div className="day-hours-section">
                <h5>🕐 Horarios del Restaurante:</h5>
                <div className="hours-inputs">
                  <div className="hours-input-group">
                    <label>Apertura:</label>
                    <input
                      type="time"
                      value={daySchedule.openingHours}
                      onChange={(e) => handleUpdateDayHours(day, 'openingHours', e.target.value)}
                      className="hours-input"
                    />
                  </div>
                  <div className="hours-input-group">
                    <label>Cierre:</label>
                    <input
                      type="time"
                      value={daySchedule.closingHours}
                      onChange={(e) => handleUpdateDayHours(day, 'closingHours', e.target.value)}
                      className="hours-input"
                    />
                  </div>
                </div>
              </div>
              
              <div className="shifts-container">
                {daySchedule.shifts.map((shift) => (
                  <div key={shift.id} className="shift-card">
                    <div className="shift-header">
                      <input
                        type="text"
                        value={shift.name}
                        onChange={(e) => handleUpdateShift(day, shift.id, 'name', e.target.value)}
                        className="shift-name-input"
                        placeholder="Nombre del turno"
                      />
                      <button 
                        className="remove-shift-btn"
                        onClick={() => handleRemoveShift(day, shift.id)}
                      >
                        🗑️
                      </button>
                    </div>
                    
                    <div className="shift-times">
                      <div className="time-input-group">
                        <label>Inicio:</label>
                        <input
                          type="time"
                          value={shift.startTime}
                          onChange={(e) => handleUpdateShift(day, shift.id, 'startTime', e.target.value)}
                          className="time-input"
                        />
                      </div>
                      <div className="time-input-group">
                        <label>Fin:</label>
                        <input
                          type="time"
                          value={shift.endTime}
                          onChange={(e) => handleUpdateShift(day, shift.id, 'endTime', e.target.value)}
                          className="time-input"
                        />
                      </div>
                      <div className="hours-display">
                        <span className={`hours-badge ${calculateWorkHours(shift.startTime, shift.endTime) > 9 ? 'invalid' : 'valid'}`}>
                          {calculateWorkHours(shift.startTime, shift.endTime).toFixed(1)}h
                        </span>
                      </div>
                    </div>
                    
                    {/* Botón para abrir modal de asignación de empleados */}
                    <div className="shift-assignment-section">
                      <button 
                        className="assign-employees-btn"
                        onClick={() => handleOpenAssignmentModal(day, shift.id)}
                      >
                        👥 Asignar Empleados
                      </button>
                    </div>
                    
                    {calculateWorkHours(shift.startTime, shift.endTime) > 9 && (
                      <div className="warning-message">
                        ⚠️ Máximo 9 horas permitidas
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Barra de progreso de cobertura de turnos */}
              <div className="coverage-progress-section">
                <h5>📊 Cobertura de Turnos:</h5>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${calculateShiftCoverage(day)}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
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
    <div className="employees-section">
      <div className="section-header">
        <h2>👥 Empleados ({employees.length})</h2>
        <button className="add-employee-btn">
          ➕ Agregar Empleado
        </button>
      </div>

      {employees.length === 0 ? (
        <div className="empty-employees">
          <div className="empty-icon">👥</div>
          <h3>No hay empleados en este restaurante</h3>
          <p>Agrega empleados para comenzar a operar</p>
        </div>
      ) : (
        <div className="employees-table-container">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Rol</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Contratado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="employee-row">
                  <td className="employee-cell">
                    <div className="employee-info-cell">
                      <div className="employee-avatar-small">
                        <span className="avatar-icon">👤</span>
                      </div>
                      <span className="employee-name">{employee.name}</span>
                    </div>
                  </td>
                  <td className="employee-cell">
                    <span className="role-badge-table">{employee.role}</span>
                  </td>
                  <td className="employee-cell">{employee.email}</td>
                  <td className="employee-cell">{employee.phone}</td>
                  <td className="employee-cell">
                    <span className={`status-badge ${employee.isActive ? 'active' : 'inactive'}`}>
                      {employee.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="employee-cell">
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </td>
                  <td className="employee-cell">
                    <div className="table-actions">
                      <button className="action-btn-table" title="Editar empleado">✏️</button>
                      <button
                        className="action-btn-table"
                        onClick={(e) => handleTransferEmployee(employee, e)}
                        title="Transferir empleado"
                      >
                        🔄
                      </button>
                      <button className="action-btn-table" title="Ver perfil">📊</button>
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
    <div className="menus-section">
      <div className="section-header">
        <h2>🍽️ Menús</h2>
        <button className="add-menu-btn">
          ➕ Crear Menú
        </button>
      </div>
      
      <div className="empty-section">
        <div className="empty-icon">🍽️</div>
        <h3>No hay menús creados</h3>
        <p>Crea menús para tu restaurante</p>
      </div>
    </div>
  );

  const renderProductsTab = () => (
    <div className="products-section">
      <div className="section-header">
        <h2>🛍️ Productos</h2>
        <button className="add-product-btn">
          ➕ Agregar Producto
        </button>
      </div>
      
      <div className="empty-section">
        <div className="empty-icon">🛍️</div>
        <h3>No hay productos registrados</h3>
        <p>Agrega productos a tu inventario</p>
      </div>
    </div>
  );

  const renderTablesTab = () => (
    <div className="tables-section">
      <div className="section-header">
        <h2>🪑 Mesas</h2>
        <button className="add-table-btn">
          ➕ Agregar Mesa
        </button>
      </div>
      
      <div className="empty-section">
        <div className="empty-icon">🪑</div>
        <h3>No hay mesas configuradas</h3>
        <p>Configura las mesas de tu restaurante</p>
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="stats-section">
      <div className="section-header">
        <h2>📊 Estadísticas</h2>
      </div>
      
      <div className="stats-grid-large">
        <div className="stat-card">
          <h3>Ventas del Día</h3>
          <div className="stat-value">$1,250</div>
          <div className="stat-change positive">+12% vs ayer</div>
        </div>
        <div className="stat-card">
          <h3>Órdenes Pendientes</h3>
          <div className="stat-value">8</div>
          <div className="stat-change neutral">Sin cambios</div>
        </div>
        <div className="stat-card">
          <h3>Clientes Atendidos</h3>
          <div className="stat-value">45</div>
          <div className="stat-change positive">+5 vs ayer</div>
        </div>
        <div className="stat-card">
          <h3>Producto Más Vendido</h3>
          <div className="stat-value">Hamburguesa Clásica</div>
          <div className="stat-change positive">23 ventas</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="restaurant-management">
      <div className="management-header">
        <div className="header-actions">
          <button className="back-btn" onClick={handleBackToRestaurants}>
            ← Volver a Mis Restaurantes
          </button>
        </div>
        <div className="header-actions-right">
          <button className="edit-btn" onClick={handleEditRestaurant}>
            ✏️ Editar Restaurante
          </button>
          <button 
            className={`status-btn ${restaurant.isOpen ? 'close' : 'open'}`}
            onClick={handleToggleStatus}
          >
            {restaurant.isOpen ? '🔴 Cerrar' : '🟢 Abrir'} Restaurante
          </button>
          <button 
            className="edit-btn" 
            onClick={clearAndReload}
            style={{ backgroundColor: '#ff6b6b', color: 'white' }}
          >
            🔄 Limpiar Cache
          </button>
        </div>
      </div>

      <div className="management-content">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Resumen
          </button>
          <button 
            className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            👥 Empleados
          </button>
          <button 
            className={`tab-btn ${activeTab === 'menus' ? 'active' : ''}`}
            onClick={() => setActiveTab('menus')}
          >
            🍽️ Menús
          </button>
          <button 
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            🛍️ Productos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tables' ? 'active' : ''}`}
            onClick={() => setActiveTab('tables')}
          >
            🪑 Mesas
          </button>
          <button 
            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Estadísticas
          </button>
        </div>

        <div className="tab-content">
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
