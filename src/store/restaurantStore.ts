import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  isOpen: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  isActive: boolean;
  hireDate: string;
  restaurantId: string;
}

interface RestaurantState {
  restaurants: Restaurant[];
  employees: Employee[];
  selectedRestaurant: Restaurant | null;
  selectedRestaurantEmployees: Employee[];
  selectedRestaurantForEmployees: Restaurant | null;
  showRestaurants: boolean;
  showEmployees: boolean;
  editingRestaurant: Restaurant | null;
}

interface RestaurantActions {
  // Restaurantes
  setRestaurants: (restaurants: Restaurant[]) => void;
  addRestaurant: (restaurant: Restaurant) => void;
  updateRestaurant: (id: string, updates: Partial<Restaurant>) => void;
  deleteRestaurant: (id: string) => void;
  
  // Empleados
  setEmployees: (employees: Employee[]) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  moveEmployee: (employeeId: string, newRestaurantId: string) => void;
  
  // UI State
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  setSelectedRestaurantEmployees: (employees: Employee[]) => void;
  setSelectedRestaurantForEmployees: (restaurant: Restaurant | null) => void;
  setShowRestaurants: (show: boolean) => void;
  setShowEmployees: (show: boolean) => void;
  setEditingRestaurant: (restaurant: Restaurant | null) => void;
  
  // Utilidades
  getEmployeesByRestaurant: (restaurantId: string) => Employee[];
  getRestaurantById: (id: string) => Restaurant | undefined;
  getEmployeeById: (id: string) => Employee | undefined;
}

type RestaurantStore = RestaurantState & RestaurantActions;

// Datos mock iniciales
const initialRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Restaurante El Buen Sabor',
    description: 'Restaurante especializado en comida tradicional argentina',
    address: 'Calle Principal 123, Buenos Aires',
    phone: '+54 11 1234 5678',
    email: 'info@elbuensabor.com',
    website: 'https://www.elbuensabor.com',
    isOpen: true,
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Pizzeria La Italiana',
    description: 'Las mejores pizzas artesanales de la ciudad',
    address: 'Avenida Corrientes 456, Buenos Aires',
    phone: '+54 11 9876 5432',
    email: 'info@laitaliana.com',
    website: 'https://www.laitaliana.com',
    isOpen: false,
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Café Central',
    description: 'Café de especialidad con ambiente acogedor',
    address: 'Plaza San Martín 789, Buenos Aires',
    phone: '+54 11 5555 1234',
    email: 'info@cafecentral.com',
    website: 'https://www.cafecentral.com',
    isOpen: true,
    isActive: true,
    createdAt: '2024-01-20T00:00:00Z'
  }
];

const initialEmployees: Employee[] = [
  // Empleados del Restaurante El Buen Sabor (ID: 1)
  {
    id: '1',
    name: 'María González',
    email: 'maria.gonzalez@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 1234 5678',
    isActive: true,
    hireDate: '2024-01-15T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 9876 5432',
    isActive: true,
    hireDate: '2024-02-01T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana.martinez@elbuensabor.com',
    role: 'CASHIER',
    phone: '+54 11 5555 1234',
    isActive: true,
    hireDate: '2024-01-20T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '4',
    name: 'Luis Pérez',
    email: 'luis.perez@elbuensabor.com',
    role: 'HOST',
    phone: '+54 11 4444 5678',
    isActive: false,
    hireDate: '2024-03-01T00:00:00Z',
    restaurantId: '1'
  },
  // Empleados de la Pizzeria La Italiana (ID: 2)
  {
    id: '5',
    name: 'Giuseppe Rossi',
    email: 'giuseppe.rossi@laitaliana.com',
    role: 'COOK',
    phone: '+54 11 1111 2222',
    isActive: true,
    hireDate: '2024-01-10T00:00:00Z',
    restaurantId: '2'
  },
  {
    id: '6',
    name: 'Sofia Bianchi',
    email: 'sofia.bianchi@laitaliana.com',
    role: 'WAITER',
    phone: '+54 11 3333 4444',
    isActive: true,
    hireDate: '2024-02-15T00:00:00Z',
    restaurantId: '2'
  },
  {
    id: '7',
    name: 'Marco Ferrari',
    email: 'marco.ferrari@laitaliana.com',
    role: 'WAITER',
    phone: '+54 11 5555 6666',
    isActive: true,
    hireDate: '2024-01-25T00:00:00Z',
    restaurantId: '2'
  },
  // Empleados del Café Central (ID: 3)
  {
    id: '8',
    name: 'Elena Morales',
    email: 'elena.morales@cafecentral.com',
    role: 'WAITER',
    phone: '+54 11 7777 8888',
    isActive: true,
    hireDate: '2024-01-05T00:00:00Z',
    restaurantId: '3'
  },
  {
    id: '9',
    name: 'Roberto Silva',
    email: 'roberto.silva@cafecentral.com',
    role: 'COOK',
    phone: '+54 11 9999 0000',
    isActive: true,
    hireDate: '2024-02-10T00:00:00Z',
    restaurantId: '3'
  },
  {
    id: '10',
    name: 'Carmen Vega',
    email: 'carmen.vega@cafecentral.com',
    role: 'CASHIER',
    phone: '+54 11 1111 3333',
    isActive: true,
    hireDate: '2024-01-30T00:00:00Z',
    restaurantId: '3'
  },
  {
    id: '11',
    name: 'Diego Torres',
    email: 'diego.torres@cafecentral.com',
    role: 'HOST',
    phone: '+54 11 4444 7777',
    isActive: false,
    hireDate: '2024-03-15T00:00:00Z',
    restaurantId: '3'
  }
];

export const useRestaurantStore = create<RestaurantStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      restaurants: initialRestaurants,
      employees: initialEmployees,
      selectedRestaurant: null,
      selectedRestaurantEmployees: [],
      selectedRestaurantForEmployees: null,
      showRestaurants: false,
      showEmployees: false,
      editingRestaurant: null,

      // Acciones para restaurantes
      setRestaurants: (restaurants) => set({ restaurants }),
      
      addRestaurant: (restaurant) => 
        set((state) => ({ 
          restaurants: [...state.restaurants, restaurant] 
        })),
      
      updateRestaurant: (id, updates) =>
        set((state) => ({
          restaurants: state.restaurants.map(restaurant =>
            restaurant.id === id ? { ...restaurant, ...updates } : restaurant
          )
        })),
      
      deleteRestaurant: (id) =>
        set((state) => ({
          restaurants: state.restaurants.filter(restaurant => restaurant.id !== id),
          employees: state.employees.filter(employee => employee.restaurantId !== id)
        })),

      // Acciones para empleados
      setEmployees: (employees) => set({ employees }),
      
      addEmployee: (employee) =>
        set((state) => ({
          employees: [...state.employees, employee]
        })),
      
      updateEmployee: (id, updates) =>
        set((state) => ({
          employees: state.employees.map(employee =>
            employee.id === id ? { ...employee, ...updates } : employee
          )
        })),
      
      deleteEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter(employee => employee.id !== id)
        })),
      
      moveEmployee: (employeeId, newRestaurantId) =>
        set((state) => {
          const employee = state.employees.find(emp => emp.id === employeeId);
          if (!employee) return state;
          
          const newRestaurant = state.restaurants.find(rest => rest.id === newRestaurantId);
          if (!newRestaurant) return state;
          
          // Actualizar el email del empleado para que coincida con el nuevo restaurante
          const emailDomain = newRestaurant.email.split('@')[1];
          const newEmail = `${employee.name.toLowerCase().replace(/\s+/g, '.')}@${emailDomain}`;
          
          return {
            employees: state.employees.map(emp =>
              emp.id === employeeId
                ? { ...emp, restaurantId: newRestaurantId, email: newEmail }
                : emp
            )
          };
        }),

      // Acciones para UI State
      setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
      
      setSelectedRestaurantEmployees: (employees) => set({ selectedRestaurantEmployees: employees }),
      
      setSelectedRestaurantForEmployees: (restaurant) => set({ selectedRestaurantForEmployees: restaurant }),
      
      setShowRestaurants: (show) => set({ showRestaurants: show }),
      
      setShowEmployees: (show) => set({ showEmployees: show }),
      
      setEditingRestaurant: (restaurant) => set({ editingRestaurant: restaurant }),

      // Utilidades
      getEmployeesByRestaurant: (restaurantId) => {
        const state = get();
        return state.employees.filter(employee => employee.restaurantId === restaurantId);
      },
      
      getRestaurantById: (id) => {
        const state = get();
        return state.restaurants.find(restaurant => restaurant.id === id);
      },
      
      getEmployeeById: (id) => {
        const state = get();
        return state.employees.find(employee => employee.id === id);
      }
    }),
    {
      name: 'restaurant-store',
      partialize: (state) => ({
        restaurants: state.restaurants,
        employees: state.employees
      })
    }
  )
);
