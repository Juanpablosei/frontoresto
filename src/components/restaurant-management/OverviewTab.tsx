import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeColors } from '../../hooks/useThemeColors';
import Button from '../buttons/Button';

interface OverviewTabProps {
  restaurant: any;
  employees: any[];
  menus: any[];
  products: any[];
  platos: any[];
  schedule: any;
  onEditRestaurant: () => void;
  onToggleStatus: () => void;
  onOpenScheduleWizard: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  restaurant,
  employees,
  menus,
  products,
  platos,
  schedule,
  onEditRestaurant,
  onToggleStatus,
  onOpenScheduleWizard
}) => {
  const { t } = useTranslation();
  const { 
    getCardBackground, 
    getCardBorder, 
    getTextColor, 
    getDangerColor,
    getSuccessColor,
    getInfoColor
  } = useThemeColors();

  return (
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
              onClick={onEditRestaurant}
            >
              ✏️ Editar
            </Button>
            <Button
              variant={restaurant.isOpen ? 'danger' : 'success'}
              onClick={onToggleStatus}
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
            onClick={onOpenScheduleWizard}
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
              const totalEmployees = daySchedule.shifts?.reduce((total: number, shift: any) => 
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
                        {daySchedule.shifts.map((shift: any, index: number) => (
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
                    onClick={onOpenScheduleWizard}
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
              onClick={onOpenScheduleWizard}
            >
              🚀 {t('restaurant.configureSchedules')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
