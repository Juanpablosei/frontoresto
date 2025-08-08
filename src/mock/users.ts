export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-001',
    name: 'Admin del Sistema',
    email: 'admin@restaurant.com',
    password: 'admin123',
    role: 'ADMIN',
    isActive: true
  },
  {
    id: 'user-002',
    name: 'María González',
    email: 'maria@buensabor.com',
    password: 'maria123',
    role: 'CLIENT_OWNER',
    isActive: true
  },
  {
    id: 'user-003',
    name: 'Carlos Rodríguez',
    email: 'carlos@buensabor.com',
    password: 'carlos123',
    role: 'CLIENT_OWNER',
    isActive: true
  },
  {
    id: 'user-004',
    name: 'Ana Martínez',
    email: 'ana@buensabor.com',
    password: 'ana123',
    role: 'WAITER',
    isActive: true
  },
  {
    id: 'user-005',
    name: 'Luis Pérez',
    email: 'luis@buensabor.com',
    password: 'luis123',
    role: 'COOK',
    isActive: true
  },
  {
    id: 'user-006',
    name: 'Sofia García',
    email: 'sofia@buensabor.com',
    password: 'sofia123',
    role: 'CASHIER',
    isActive: true
  },
  {
    id: 'user-007',
    name: 'Diego Morales',
    email: 'diego@deliciasgourmet.com',
    password: 'diego123',
    role: 'CLIENT_OWNER',
    isActive: true
  },
  {
    id: 'user-008',
    name: 'Valentina Herrera',
    email: 'valentina@deliciasgourmet.com',
    password: 'valentina123',
    role: 'EMPLOYEE',
    isActive: true
  }
];
