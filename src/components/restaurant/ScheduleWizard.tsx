import React, { useState, useEffect } from 'react';
import { Button } from '../buttons';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useRestaurantSchedule } from '../../store/scheduleStore';
import { Shift, DaySchedule, ScheduleWizardStep } from '../../types/schedule';
import { Employee } from '../admin/types';
import { useTranslation } from '../../hooks/useTranslation';

interface ScheduleWizardProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string;
  initialSchedule?: Record<string, DaySchedule>;
}

const ScheduleWizard: React.FC<ScheduleWizardProps> = ({
  isOpen,
  onClose,
  restaurantId,
  initialSchedule
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Mock employee data - en una implementación real vendría del store
  const mockEmployees: Employee[] = [
    {
      id: 'emp-001',
      name: 'Carlos Rodríguez',
      email: 'carlos@restaurant.com',
      role: 'MANAGER',
      isActive: true,
      createdAt: '2024-01-03T00:00:00Z',
      lastLogin: '2024-01-15T10:30:00Z'
    },
    {
      id: 'emp-002',
      name: 'Ana Martínez',
      email: 'ana@restaurant.com',
      role: 'WAITER',
      isActive: true,
      createdAt: '2024-01-04T00:00:00Z',
      lastLogin: '2024-01-15T09:15:00Z'
    },
    {
      id: 'emp-003',
      name: 'Luis Pérez',
      email: 'luis@restaurant.com',
      role: 'COOK',
      isActive: true,
      createdAt: '2024-01-05T00:00:00Z',
      lastLogin: '2024-01-15T08:45:00Z'
    },
    {
      id: 'emp-004',
      name: 'Sofia García',
      email: 'sofia@restaurant.com',
      role: 'CASHIER',
      isActive: true,
      createdAt: '2024-01-06T00:00:00Z',
      lastLogin: '2024-01-15T11:20:00Z'
    },
    {
      id: 'emp-005',
      name: 'Diego Morales',
      email: 'diego@restaurant.com',
      role: 'WAITER',
      isActive: true,
      createdAt: '2024-01-07T00:00:00Z',
      lastLogin: '2024-01-15T12:00:00Z'
    },
    {
      id: 'emp-006',
      name: 'María López',
      email: 'maria@restaurant.com',
      role: 'HOST',
      isActive: true,
      createdAt: '2024-01-08T00:00:00Z',
      lastLogin: '2024-01-15T13:30:00Z'
    }
  ];
  
  // Usar el store de Zustand
  const { 
    schedule, 
    saveSchedule, 
    updateDaySchedule,
    getConfiguredDays,
    setLoading, 
    setError 
  } = useRestaurantSchedule(restaurantId);
  
  const { t } = useTranslation();
  
  // Estado local para días seleccionados (se mantiene durante la sesión del wizard)
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
  const { 
    getModalBackground, 
    getModalOverlay, 
    getTextColor, 
    getInputBackground, 
    getInputBorder, 
    getInputFocusBorder,
    getCardBackground,
    getCardBorder,
    getInfoColor,
    getSuccessColor,
    getWarningColor
  } = useThemeColors();

  // Helper functions for employee roles
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'MANAGER':
        return '👔';
      case 'WAITER':
        return '🍽️';
      case 'COOK':
        return '👨‍🍳';
      case 'CASHIER':
        return '💰';
      case 'HOST':
        return '👋';
      case 'EMPLOYEE':
        return '👤';
      default:
        return '👤';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'MANAGER':
        return '#3498db';
      case 'WAITER':
        return '#e74c3c';
      case 'COOK':
        return '#f39c12';
      case 'CASHIER':
        return '#27ae60';
      case 'HOST':
        return '#9b59b6';
      case 'EMPLOYEE':
        return '#95a5a6';
      default:
        return '#95a5a6';
    }
  };

  // Filter employees based on search
  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    employee.role.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    employee.email.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const steps: ScheduleWizardStep[] = [
    {
      id: 'days',
      title: 'Seleccionar Día',
      description: 'Elige el día de la semana que quieres configurar',
      icon: '📅'
    },
    {
      id: 'hours',
      title: 'Horarios de Apertura',
      description: 'Define los horarios de apertura y cierre para el día seleccionado',
      icon: '🕐'
    },
    {
      id: 'shifts',
      title: 'Configurar Turnos',
      description: 'Agrega y configura los turnos de trabajo',
      icon: '👥'
    },
    {
      id: 'employees',
      title: 'Asignar Empleados',
      description: 'Asigna empleados a cada turno',
      icon: '👨‍💼'
    },
    {
      id: 'review',
      title: 'Revisar y Guardar',
      description: 'Revisa toda la configuración antes de guardar',
      icon: '✅'
    }
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Lunes', short: 'Lun' },
    { key: 'tuesday', label: 'Martes', short: 'Mar' },
    { key: 'wednesday', label: 'Miércoles', short: 'Mié' },
    { key: 'thursday', label: 'Jueves', short: 'Jue' },
    { key: 'friday', label: 'Viernes', short: 'Vie' },
    { key: 'saturday', label: 'Sábado', short: 'Sáb' },
    { key: 'sunday', label: 'Domingo', short: 'Dom' }
  ];

  useEffect(() => {
    if (isOpen && !hasInitialized) {
      if (initialSchedule) {
        // Si hay horarios iniciales, cargarlos en el store
        saveSchedule(initialSchedule);
        setSelectedDays(Object.keys(initialSchedule));
      } else {
        // Cargar días ya configurados del store
        const configuredDays = getConfiguredDays();
        setSelectedDays(configuredDays);
      }
      setCurrentStep(0);
      setHasInitialized(true);
    }
  }, [isOpen, initialSchedule, hasInitialized, saveSchedule, getConfiguredDays]);

  const handleDayToggle = (dayKey: string) => {
    setSelectedDays(prev => {
      // Si el día ya está seleccionado, deseleccionarlo
      if (prev.includes(dayKey)) {
        return [];
      }
      
      // Si se está seleccionando un nuevo día, reemplazar la selección
      const newSelectedDays = [dayKey];
      
      // Inicializar el día en el store
      const defaultDaySchedule: DaySchedule = {
        openingHours: '08:00',
        closingHours: '22:00',
        shifts: []
      };
      updateDaySchedule(dayKey, defaultDaySchedule);
      
      return newSelectedDays;
    });
  };

  const handleUpdateDayHours = (dayKey: string, field: 'openingHours' | 'closingHours', value: string) => {
    const currentDaySchedule = schedule[dayKey] || {
      openingHours: '08:00',
      closingHours: '22:00',
      shifts: []
    };
    
    const updatedDaySchedule = {
      ...currentDaySchedule,
      [field]: value
    };
    
    updateDaySchedule(dayKey, updatedDaySchedule);
  };

  const handleAddShift = (dayKey: string) => {
    const newShiftId = `${dayKey}-shift-${Date.now()}`;
    const daySchedule = schedule[dayKey];
    
    // Calcular horarios inteligentes basados en el horario de operación
    let startTime = '09:00';
    let endTime = '17:00';
    
    if (daySchedule?.openingHours && daySchedule?.closingHours) {
      const openingTime = new Date(`2000-01-01T${daySchedule.openingHours}:00`);
      const closingTime = new Date(`2000-01-01T${daySchedule.closingHours}:00`);
      const totalMinutes = (closingTime.getTime() - openingTime.getTime()) / (1000 * 60);
      
      // Si hay turnos existentes, crear un turno que complemente
      const existingShifts = daySchedule.shifts || [];
      if (existingShifts.length > 0) {
        // Encontrar huecos en la cobertura
        const sortedShifts = [...existingShifts].sort((a, b) => 
          new Date(`2000-01-01T${a.startTime}:00`).getTime() - 
          new Date(`2000-01-01T${b.startTime}:00`).getTime()
        );
        
        // Buscar el primer hueco disponible
        let currentTime = openingTime;
        for (const shift of sortedShifts) {
          const shiftStart = new Date(`2000-01-01T${shift.startTime}:00`);
          if (shiftStart > currentTime) {
            // Hay un hueco antes de este turno
            startTime = currentTime.toTimeString().slice(0, 5);
            endTime = shiftStart.toTimeString().slice(0, 5);
            break;
          }
          const shiftEnd = new Date(`2000-01-01T${shift.endTime}:00`);
          currentTime = shiftEnd > currentTime ? shiftEnd : currentTime;
        }
        
        // Si no hay huecos, agregar después del último turno
        if (currentTime < closingTime) {
          startTime = currentTime.toTimeString().slice(0, 5);
          endTime = closingTime.toTimeString().slice(0, 5);
        }
      } else {
        // Primer turno: usar el horario de operación
        startTime = daySchedule.openingHours;
        endTime = daySchedule.closingHours;
      }
    }
    
    const newShift: Shift = {
      id: newShiftId,
      name: `Turno ${(schedule[dayKey]?.shifts?.length || 0) + 1}`,
      startTime,
      endTime,
      assignedEmployees: []
    };

    const currentDaySchedule = schedule[dayKey] || {
      openingHours: '08:00',
      closingHours: '22:00',
      shifts: []
    };

    const updatedDaySchedule = {
      ...currentDaySchedule,
      shifts: [...(currentDaySchedule.shifts || []), newShift]
    };

    updateDaySchedule(dayKey, updatedDaySchedule);
  };

  const handleUpdateShift = (dayKey: string, shiftId: string, field: keyof Shift, value: any) => {
    const currentDaySchedule = schedule[dayKey];
    if (!currentDaySchedule) return;

    const updatedDaySchedule = {
      ...currentDaySchedule,
      shifts: currentDaySchedule.shifts.map(shift => 
        shift.id === shiftId 
          ? { ...shift, [field]: value }
          : shift
      )
    };

    updateDaySchedule(dayKey, updatedDaySchedule);
  };

  const handleRemoveShift = (dayKey: string, shiftId: string) => {
    const currentDaySchedule = schedule[dayKey];
    if (!currentDaySchedule) return;

    const updatedDaySchedule = {
      ...currentDaySchedule,
      shifts: currentDaySchedule.shifts.filter(shift => shift.id !== shiftId)
    };

    updateDaySchedule(dayKey, updatedDaySchedule);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setLoading(true);
    try {
      // Los horarios ya están guardados en el store, solo cerrar el modal
      setError(null);
      setHasInitialized(false);
      onClose();
    } catch (error) {
      console.error('Error al guardar horarios:', error);
      setError('Error al guardar los horarios');
    } finally {
      setIsSaving(false);
      setLoading(false);
    }
  };

  // Función para calcular el progreso de cobertura de turnos
  const calculateShiftCoverage = (dayKey: string) => {
    const daySchedule = schedule[dayKey];
    if (!daySchedule?.openingHours || !daySchedule?.closingHours || !daySchedule?.shifts) {
      return 0;
    }

    const openingTime = new Date(`2000-01-01T${daySchedule.openingHours}:00`);
    const closingTime = new Date(`2000-01-01T${daySchedule.closingHours}:00`);
    const totalMinutes = (closingTime.getTime() - openingTime.getTime()) / (1000 * 60);

    if (totalMinutes <= 0) return 0;

    let coveredMinutes = 0;
    daySchedule.shifts.forEach(shift => {
      const shiftStart = new Date(`2000-01-01T${shift.startTime}:00`);
      const shiftEnd = new Date(`2000-01-01T${shift.endTime}:00`);
      
      // Asegurar que el turno esté dentro del horario de operación
      const effectiveStart = shiftStart < openingTime ? openingTime : shiftStart;
      const effectiveEnd = shiftEnd > closingTime ? closingTime : shiftEnd;
      
      if (effectiveStart < effectiveEnd) {
        coveredMinutes += (effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60);
      }
    });

    return Math.min(100, (coveredMinutes / totalMinutes) * 100);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Día seleccionado
        return selectedDays.length > 0;
      case 1: // Horarios configurados
        return selectedDays.every(day => 
          schedule[day]?.openingHours && schedule[day]?.closingHours
        );
      case 2: // Turnos configurados
        return selectedDays.every(day => {
          const coverage = calculateShiftCoverage(day);
          return coverage >= 100; // Debe estar 100% cubierto
        });
      case 3: // Asignación de empleados
        return selectedDays.every(day => {
          const daySchedule = schedule[day];
          return daySchedule?.shifts?.every(shift => 
            shift.assignedEmployees && shift.assignedEmployees.length > 0
          );
        });
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: getTextColor(900) }}>
        {t('schedules.wizard.step1.title')}
      </h3>
      <p className="text-sm" style={{ color: getTextColor(600) }}>
        {t('schedules.wizard.step1.singleDayNote')}
      </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {daysOfWeek.map(day => (
                <button
                  key={day.key}
                  onClick={() => handleDayToggle(day.key)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedDays.includes(day.key) 
                      ? 'ring-2 ring-opacity-50' 
                      : ''
                  }`}
                  style={{
                    backgroundColor: selectedDays.includes(day.key) 
                      ? getInfoColor() + '20' 
                      : getCardBackground(),
                    borderColor: selectedDays.includes(day.key) 
                      ? getInfoColor() 
                      : getCardBorder(),
                    color: selectedDays.includes(day.key) 
                      ? getTextColor(900) 
                      : getTextColor(700)
                  }}
                >
                  <div className="text-2xl mb-2">{day.short}</div>
                  <div className="text-sm font-medium">{day.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: getTextColor(900) }}>
                Configura los horarios de apertura y cierre
              </h3>
              <p className="text-sm" style={{ color: getTextColor(600) }}>
                Define cuándo abre y cierra el restaurante cada día
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDays.map(dayKey => {
                const day = daysOfWeek.find(d => d.key === dayKey);
                const daySchedule = schedule[dayKey];
                
                return (
                  <div 
                    key={dayKey}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: getCardBackground(),
                      borderColor: getCardBorder()
                    }}
                  >
                    <h4 className="font-semibold mb-3" style={{ color: getTextColor(900) }}>
                      {day?.label}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: getTextColor(700) }}>
                          Apertura
                        </label>
                        <input
                          type="time"
                          value={daySchedule?.openingHours || '08:00'}
                          onChange={(e) => handleUpdateDayHours(dayKey, 'openingHours', e.target.value)}
                          className="w-full px-3 py-2 rounded border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                          style={{
                            backgroundColor: getInputBackground(),
                            borderColor: getInputBorder(),
                            color: getTextColor(900)
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = getInputFocusBorder();
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = getInputBorder();
                          }}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: getTextColor(700) }}>
                          Cierre
                        </label>
                        <input
                          type="time"
                          value={daySchedule?.closingHours || '22:00'}
                          onChange={(e) => handleUpdateDayHours(dayKey, 'closingHours', e.target.value)}
                          className="w-full px-3 py-2 rounded border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                          style={{
                            backgroundColor: getInputBackground(),
                            borderColor: getInputBorder(),
                            color: getTextColor(900)
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = getInputFocusBorder();
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = getInputBorder();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: getTextColor(900) }}>
                Configura los turnos de trabajo
              </h3>
              <p className="text-sm" style={{ color: getTextColor(600) }}>
                Agrega turnos para cubrir los horarios de operación
              </p>
            </div>
            
            <div className="space-y-4">
              {selectedDays.map(dayKey => {
                const day = daysOfWeek.find(d => d.key === dayKey);
                const daySchedule = schedule[dayKey];
                
                return (
                  <div 
                    key={dayKey}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: getCardBackground(),
                      borderColor: getCardBorder()
                    }}
                  >
                                         <div className="flex justify-between items-center mb-4">
                       <h4 className="font-semibold" style={{ color: getTextColor(900) }}>
                         {day?.label}
                       </h4>
                       <Button
                         variant="primary"
                         size="small"
                         onClick={() => handleAddShift(dayKey)}
                       >
                         ➕ Agregar Turno
                       </Button>
                     </div>
                     
                     {/* Barra de progreso de cobertura */}
                     <div className="mb-4">
                       <div className="flex justify-between items-center mb-2">
                         <span className="text-sm font-medium" style={{ color: getTextColor(700) }}>
                           Cobertura de turnos
                         </span>
                         <span className="text-sm font-bold" style={{ color: getTextColor(900) }}>
                           {Math.round(calculateShiftCoverage(dayKey))}%
                         </span>
                       </div>
                       <div className="w-full bg-gray-200 rounded-full h-2">
                         <div 
                           className="h-2 rounded-full transition-all duration-300"
                           style={{
                             width: `${calculateShiftCoverage(dayKey)}%`,
                             backgroundColor: calculateShiftCoverage(dayKey) >= 100 
                               ? getSuccessColor() 
                               : getInfoColor()
                           }}
                         />
                       </div>
                       <div className="flex justify-between text-xs mt-1" style={{ color: getTextColor(600) }}>
                         <span>{daySchedule?.openingHours || '08:00'}</span>
                         <span>{daySchedule?.closingHours || '22:00'}</span>
                       </div>
                     </div>
                    
                    {daySchedule?.shifts && daySchedule.shifts.length > 0 ? (
                      <div className="space-y-3">
                        {daySchedule.shifts.map((shift, index) => (
                          <div 
                            key={shift.id}
                            className="p-3 rounded border"
                            style={{
                              backgroundColor: getCardBackground(),
                              borderColor: getCardBorder()
                            }}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <input
                                type="text"
                                value={shift.name}
                                onChange={(e) => handleUpdateShift(dayKey, shift.id, 'name', e.target.value)}
                                className="font-medium text-sm border-none bg-transparent focus:outline-none"
                                style={{ color: getTextColor(900) }}
                              />
                              <button
                                onClick={() => handleRemoveShift(dayKey, shift.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                🗑️
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs font-medium mb-1" style={{ color: getTextColor(700) }}>
                                  Inicio
                                </label>
                                <input
                                  type="time"
                                  value={shift.startTime}
                                  onChange={(e) => handleUpdateShift(dayKey, shift.id, 'startTime', e.target.value)}
                                  className="w-full px-2 py-1 text-xs border rounded"
                                  style={{
                                    backgroundColor: getInputBackground(),
                                    borderColor: getInputBorder(),
                                    color: getTextColor(900)
                                  }}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium mb-1" style={{ color: getTextColor(700) }}>
                                  Fin
                                </label>
                                <input
                                  type="time"
                                  value={shift.endTime}
                                  onChange={(e) => handleUpdateShift(dayKey, shift.id, 'endTime', e.target.value)}
                                  className="w-full px-2 py-1 text-xs border rounded"
                                  style={{
                                    backgroundColor: getInputBackground(),
                                    borderColor: getInputBorder(),
                                    color: getTextColor(900)
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                                         ) : (
                       <div className="text-center py-4">
                         <p className="text-sm" style={{ color: getTextColor(600) }}>
                           No hay turnos configurados. Haz clic en "Agregar Turno" para comenzar.
                         </p>
                       </div>
                     )}
                     
                     {/* Mensaje de cobertura incompleta */}
                     {calculateShiftCoverage(dayKey) < 100 && daySchedule?.shifts && daySchedule.shifts.length > 0 && (
                       <div className="mt-3 p-3 rounded-lg border" style={{ 
                         backgroundColor: getWarningColor() + '20',
                         borderColor: getWarningColor()
                       }}>
                         <p className="text-sm font-medium" style={{ color: getTextColor(700) }}>
                           ⚠️ Cobertura incompleta
                         </p>
                         <p className="text-xs mt-1" style={{ color: getTextColor(600) }}>
                           Los turnos deben cubrir todo el horario de operación ({daySchedule.openingHours} - {daySchedule.closingHours})
                         </p>
                       </div>
                     )}
                  </div>
                );
              })}
            </div>
          </div>
        );

                   case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: getTextColor(900) }}>
                Asigna empleados a cada turno
              </h3>
              <p className="text-sm" style={{ color: getTextColor(600) }}>
                Busca y selecciona qué empleados trabajarán en cada turno
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                                 <input
                   type="text"
                   placeholder="Buscar empleados por nombre, rol o email..."
                   value={employeeSearch}
                   onChange={(e) => setEmployeeSearch(e.target.value)}
                   className="w-full px-4 py-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                   style={{
                     backgroundColor: getInputBackground(),
                     borderColor: getInputBorder(),
                     color: getTextColor(900),
                     '--tw-ring-color': getInputFocusBorder()
                   } as React.CSSProperties}
                 />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-lg">🔍</span>
                </div>
                {employeeSearch && (
                  <button
                    onClick={() => setEmployeeSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    style={{ color: getTextColor(500) }}
                  >
                    ✕
                  </button>
                )}
              </div>
              {employeeSearch && (
                <p className="text-xs mt-2" style={{ color: getTextColor(600) }}>
                  Mostrando {filteredEmployees.length} de {mockEmployees.length} empleados
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              {selectedDays.map(dayKey => {
                const day = daysOfWeek.find(d => d.key === dayKey);
                const daySchedule = schedule[dayKey];
                
                return (
                  <div 
                    key={dayKey}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: getCardBackground(),
                      borderColor: getCardBorder()
                    }}
                  >
                    <h4 className="font-semibold mb-4" style={{ color: getTextColor(900) }}>
                      {day?.label}
                    </h4>
                    
                    {daySchedule?.shifts && daySchedule.shifts.length > 0 ? (
                      <div className="space-y-3">
                        {daySchedule.shifts.map((shift, index) => (
                          <div 
                            key={shift.id}
                            className="p-3 rounded border"
                            style={{
                              backgroundColor: getCardBackground(),
                              borderColor: getCardBorder()
                            }}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-medium" style={{ color: getTextColor(900) }}>
                                {shift.name}: {shift.startTime} - {shift.endTime}
                              </h5>
                              <span className="text-xs px-2 py-1 rounded" style={{ 
                                backgroundColor: getInfoColor() + '20',
                                color: getTextColor(700)
                              }}>
                                {shift.assignedEmployees?.length || 0} empleados
                              </span>
                            </div>
                            
                            <div className="space-y-3">
                              <label className="block text-sm font-medium" style={{ color: getTextColor(700) }}>
                                Empleados asignados:
                              </label>
                              
                              {filteredEmployees.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {filteredEmployees.map(employee => (
                                    <label 
                                      key={employee.id} 
                                      className="flex items-center space-x-3 p-2 rounded-lg border cursor-pointer hover:bg-opacity-50 transition-all"
                                      style={{
                                        backgroundColor: getCardBackground(),
                                        borderColor: getCardBorder()
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={shift.assignedEmployees?.includes(employee.name) || false}
                                        onChange={(e) => {
                                          const currentEmployees = shift.assignedEmployees || [];
                                          const newEmployees = e.target.checked
                                            ? [...currentEmployees, employee.name]
                                            : currentEmployees.filter(emp => emp !== employee.name);
                                          
                                          handleUpdateShift(dayKey, shift.id, 'assignedEmployees', newEmployees);
                                        }}
                                        className="rounded"
                                        style={{ accentColor: getInfoColor() }}
                                      />
                                      <div className="flex items-center space-x-2">
                                        <div 
                                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                                          style={{ backgroundColor: getRoleColor(employee.role) + '20' }}
                                        >
                                          <span>{getRoleIcon(employee.role)}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="font-medium text-sm" style={{ color: getTextColor(900) }}>
                                            {employee.name}
                                          </div>
                                          <div className="text-xs" style={{ color: getTextColor(600) }}>
                                            {employee.role}
                                          </div>
                                        </div>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <p className="text-sm" style={{ color: getTextColor(600) }}>
                                    {employeeSearch ? 'No se encontraron empleados con esa búsqueda.' : 'No hay empleados disponibles.'}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm" style={{ color: getTextColor(600) }}>
                          No hay turnos configurados para este día.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

       case 4:
         return (
           <div className="space-y-6">
             <div className="text-center mb-6">
               <h3 className="text-lg font-semibold mb-2" style={{ color: getTextColor(900) }}>
                 Revisa la configuración
               </h3>
               <p className="text-sm" style={{ color: getTextColor(600) }}>
                 Verifica que todo esté correcto antes de guardar
               </p>
             </div>
            
            <div className="space-y-4">
              {selectedDays.map(dayKey => {
                const day = daysOfWeek.find(d => d.key === dayKey);
                const daySchedule = schedule[dayKey];
                
                return (
                  <div 
                    key={dayKey}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: getCardBackground(),
                      borderColor: getCardBorder()
                    }}
                  >
                    <h4 className="font-semibold mb-3" style={{ color: getTextColor(900) }}>
                      {day?.label}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium" style={{ color: getTextColor(700) }}>
                          Horario:
                        </span>
                        <p className="text-sm" style={{ color: getTextColor(600) }}>
                          {daySchedule?.openingHours} - {daySchedule?.closingHours}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium" style={{ color: getTextColor(700) }}>
                          Turnos:
                        </span>
                        <p className="text-sm" style={{ color: getTextColor(600) }}>
                          {daySchedule?.shifts?.length || 0} turnos configurados
                        </p>
                      </div>
                    </div>
                    
                                         {daySchedule?.shifts && daySchedule.shifts.length > 0 && (
                       <div className="mt-3 pt-3 border-t" style={{ borderColor: getCardBorder() }}>
                         <span className="text-sm font-medium" style={{ color: getTextColor(700) }}>
                           Turnos:
                         </span>
                         <div className="mt-2 space-y-2">
                           {daySchedule.shifts.map(shift => (
                             <div 
                               key={shift.id}
                               className="text-sm p-2 rounded"
                               style={{
                                 backgroundColor: getInfoColor() + '20',
                                 color: getTextColor(700)
                               }}
                             >
                               <div className="font-medium">
                                 {shift.name}: {shift.startTime} - {shift.endTime}
                               </div>
                               {shift.assignedEmployees && shift.assignedEmployees.length > 0 && (
                                 <div className="text-xs mt-1 opacity-75">
                                   Empleados: {shift.assignedEmployees.join(', ')}
                                 </div>
                               )}
                             </div>
                           ))}
                         </div>
                       </div>
                     )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: getModalOverlay() }}
    >
      <div 
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
        style={{ backgroundColor: getModalBackground() }}
      >
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ borderColor: getCardBorder() }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 
                className="text-2xl font-bold"
                style={{ color: getTextColor(900) }}
              >
                ⏰ Configurar Horarios
              </h2>
              <p 
                className="text-sm mt-1"
                style={{ color: getTextColor(600) }}
              >
                Paso {currentStep + 1} de {steps.length}: {steps[currentStep].title}
              </p>
            </div>
                         <button
               onClick={() => {
                 setHasInitialized(false);
                 onClose();
               }}
               className="text-2xl hover:opacity-70 transition-opacity"
               style={{ color: getTextColor(500) }}
             >
               ×
             </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep ? 'text-white' : ''
                  }`}
                  style={{
                    backgroundColor: index <= currentStep ? getInfoColor() : getCardBorder()
                  }}
                >
                  {index < currentStep ? '✓' : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-16 h-1 mx-2 ${
                      index < currentStep ? '' : ''
                    }`}
                    style={{
                      backgroundColor: index < currentStep ? getInfoColor() : getCardBorder()
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
                 <div 
           className="p-6 border-t flex justify-between"
           style={{ borderColor: getCardBorder() }}
         >
           <Button 
             variant="secondary" 
             onClick={currentStep === 0 ? () => {
               setHasInitialized(false);
               onClose();
             } : handlePrevious}
           >
             {currentStep === 0 ? 'Cancelar' : 'Anterior'}
           </Button>
          
          <div className="flex gap-3">
            {currentStep < steps.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSave}
                loading={isSaving}
                disabled={!canProceed()}
              >
                {isSaving ? 'Guardando...' : 'Guardar Horarios'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleWizard;
