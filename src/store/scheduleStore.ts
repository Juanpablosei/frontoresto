import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Shift, DaySchedule } from '../types/schedule';

interface ScheduleState {
  // Estado
  schedules: Record<string, Record<string, DaySchedule>>;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  loadSchedule: (restaurantId: string) => Record<string, DaySchedule> | null;
  saveSchedule: (restaurantId: string, schedule: Record<string, DaySchedule>) => void;
  updateDaySchedule: (restaurantId: string, dayKey: string, daySchedule: DaySchedule) => void;
  removeDaySchedule: (restaurantId: string, dayKey: string) => void;
  getDaySchedule: (restaurantId: string, dayKey: string) => DaySchedule | null;
  hasDaySchedule: (restaurantId: string, dayKey: string) => boolean;
  getConfiguredDays: (restaurantId: string) => string[];
  clearRestaurantSchedule: (restaurantId: string) => void;
  exportSchedule: (restaurantId: string) => any;
  importSchedule: (restaurantId: string, importedData: any) => boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      schedules: {},
      isLoading: false,
      error: null,

      // Cargar horarios de un restaurante
      loadSchedule: (restaurantId: string) => {
        const { schedules } = get();
        return schedules[restaurantId] || null;
      },

      // Guardar horarios completos de un restaurante
      saveSchedule: (restaurantId: string, schedule: Record<string, DaySchedule>) => {
        set((state) => ({
          schedules: {
            ...state.schedules,
            [restaurantId]: schedule
          },
          error: null
        }));
      },

      // Actualizar horario de un día específico
      updateDaySchedule: (restaurantId: string, dayKey: string, daySchedule: DaySchedule) => {
        set((state) => {
          const currentSchedule = state.schedules[restaurantId] || {};
          return {
            schedules: {
              ...state.schedules,
              [restaurantId]: {
                ...currentSchedule,
                [dayKey]: daySchedule
              }
            },
            error: null
          };
        });
      },

      // Eliminar horario de un día específico
      removeDaySchedule: (restaurantId: string, dayKey: string) => {
        set((state) => {
          const currentSchedule = state.schedules[restaurantId];
          if (!currentSchedule) return state;

          const updatedSchedule = { ...currentSchedule };
          delete updatedSchedule[dayKey];

          return {
            schedules: {
              ...state.schedules,
              [restaurantId]: updatedSchedule
            },
            error: null
          };
        });
      },

      // Obtener horario de un día específico
      getDaySchedule: (restaurantId: string, dayKey: string) => {
        const { schedules } = get();
        const restaurantSchedule = schedules[restaurantId];
        return restaurantSchedule?.[dayKey] || null;
      },

      // Verificar si un día tiene horarios configurados
      hasDaySchedule: (restaurantId: string, dayKey: string) => {
        const { schedules } = get();
        const restaurantSchedule = schedules[restaurantId];
        return !!restaurantSchedule?.[dayKey];
      },

      // Obtener todos los días configurados de un restaurante
      getConfiguredDays: (restaurantId: string) => {
        const { schedules } = get();
        const restaurantSchedule = schedules[restaurantId];
        return restaurantSchedule ? Object.keys(restaurantSchedule) : [];
      },

      // Limpiar todos los horarios de un restaurante
      clearRestaurantSchedule: (restaurantId: string) => {
        set((state) => {
          const updatedSchedules = { ...state.schedules };
          delete updatedSchedules[restaurantId];

          return {
            schedules: updatedSchedules,
            error: null
          };
        });
      },

      // Exportar horarios de un restaurante
      exportSchedule: (restaurantId: string) => {
        const { schedules } = get();
        const restaurantSchedule = schedules[restaurantId];
        
        return {
          restaurantId,
          schedule: restaurantSchedule || {},
          exportedAt: new Date().toISOString()
        };
      },

      // Importar horarios para un restaurante
      importSchedule: (restaurantId: string, importedData: any) => {
        if (importedData.restaurantId === restaurantId && importedData.schedule) {
          get().saveSchedule(restaurantId, importedData.schedule);
          return true;
        }
        return false;
      },

      // Establecer estado de carga
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Establecer error
      setError: (error: string | null) => {
        set({ error });
      },

      // Limpiar error
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'restaurant-schedules', // Clave para localStorage
      partialize: (state) => ({ schedules: state.schedules }), // Solo persistir schedules
    }
  )
);

// Hook personalizado para usar el store con un restaurante específico
export const useRestaurantSchedule = (restaurantId: string) => {
  const {
    schedules,
    isLoading,
    error,
    loadSchedule,
    saveSchedule,
    updateDaySchedule,
    removeDaySchedule,
    getDaySchedule,
    hasDaySchedule,
    getConfiguredDays,
    clearRestaurantSchedule,
    exportSchedule,
    importSchedule,
    setLoading,
    setError,
    clearError
  } = useScheduleStore();

  const currentSchedule = schedules[restaurantId] || {};

  return {
    // Estado
    schedule: currentSchedule,
    isLoading,
    error,
    
    // Acciones
    loadSchedule: () => loadSchedule(restaurantId),
    saveSchedule: (schedule: Record<string, DaySchedule>) => saveSchedule(restaurantId, schedule),
    updateDaySchedule: (dayKey: string, daySchedule: DaySchedule) => updateDaySchedule(restaurantId, dayKey, daySchedule),
    removeDaySchedule: (dayKey: string) => removeDaySchedule(restaurantId, dayKey),
    getDaySchedule: (dayKey: string) => getDaySchedule(restaurantId, dayKey),
    hasDaySchedule: (dayKey: string) => hasDaySchedule(restaurantId, dayKey),
    getConfiguredDays: () => getConfiguredDays(restaurantId),
    clearSchedule: () => clearRestaurantSchedule(restaurantId),
    exportSchedule: () => exportSchedule(restaurantId),
    importSchedule: (importedData: any) => importSchedule(restaurantId, importedData),
    setLoading,
    setError,
    clearError
  };
};
