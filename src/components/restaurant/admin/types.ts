// Tipos base del restaurante
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  clientId: string;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tipos para las mesas
export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  restaurantId: string;
}

// Tipos para los productos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  restaurantId: string;
}

// Tipos para los menús
export interface Menu {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  restaurantId: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

// Tipos para las estadísticas
export interface RestaurantStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  popularProducts: PopularProduct[];
  dailyStats: DailyStat[];
}

export interface PopularProduct {
  id: string;
  name: string;
  price: number;
  orderCount: number;
}

export interface DailyStat {
  date: string;
  orders: number;
  revenue: number;
}

// Tipos para las acciones del panel
export interface AdminPanelState {
  selectedRestaurant: Restaurant | null;
  isEditing: boolean;
  isLoading: boolean;
  error: string | null;
}

// Tipos para las operaciones CRUD
export interface CreateRestaurantData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  clientId: string;
}

export interface UpdateRestaurantData {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

// Tipos para las respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
