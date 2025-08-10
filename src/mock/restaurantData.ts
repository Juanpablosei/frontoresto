// Datos mock para el panel de gestión de restaurantes

export interface MockMenu {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isActive: boolean;
  items: number;
  createdAt: string;
  updatedAt: string;
}

export interface MockPlato {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isActive: boolean;
  ingredients: string[];
  preparationTime: number;
  allergens: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MockProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  isActive: boolean;
  allergens: string[];
  preparationTime: number;
  createdAt: string;
  updatedAt: string;
}

export const mockMenus: MockMenu[] = [
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
];

export const mockPlatos: MockPlato[] = [
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
];

export const mockProducts: MockProduct[] = [
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
];
