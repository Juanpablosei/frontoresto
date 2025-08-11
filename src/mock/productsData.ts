// Datos mock para productos/ingredientes del restaurante

export interface MockIngredient {
  id: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  isActive: boolean;
  supplier: string;
  allergens: string[];
  expirationDate?: string;
  createdAt: string;
  updatedAt: string;
}

export const mockIngredients: MockIngredient[] = [
  {
    id: 'ing-1',
    name: 'Arroz Blanco',
    description: 'Arroz blanco de grano largo para cocina asiática',
    category: 'GRANOS',
    unit: 'kg',
    price: 2500,
    cost: 1800,
    stock: 50,
    minStock: 10,
    isActive: true,
    supplier: 'Distribuidora Central',
    allergens: [],
    expirationDate: '2024-12-31',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 'ing-2',
    name: 'Fideos Spaghetti',
    description: 'Fideos spaghetti italianos de trigo duro',
    category: 'PASTAS',
    unit: 'kg',
    price: 3200,
    cost: 2200,
    stock: 25,
    minStock: 5,
    isActive: true,
    supplier: 'Importadora Mediterránea',
    allergens: ['Gluten'],
    expirationDate: '2024-11-30',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: 'ing-3',
    name: 'Tomates Frescos',
    description: 'Tomates frescos de la huerta local',
    category: 'VERDURAS',
    unit: 'kg',
    price: 1800,
    cost: 1200,
    stock: 15,
    minStock: 3,
    isActive: true,
    supplier: 'Huerta El Paraíso',
    allergens: [],
    expirationDate: '2024-02-15',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19'
  },
  {
    id: 'ing-4',
    name: 'Pollo Entero',
    description: 'Pollo fresco de granja certificada',
    category: 'CARNES',
    unit: 'kg',
    price: 4500,
    cost: 3200,
    stock: 20,
    minStock: 5,
    isActive: true,
    supplier: 'Granja San Martín',
    allergens: [],
    expirationDate: '2024-02-10',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-16'
  },
  {
    id: 'ing-5',
    name: 'Queso Mozzarella',
    description: 'Queso mozzarella fresco para pizzas',
    category: 'LÁCTEOS',
    unit: 'kg',
    price: 3800,
    cost: 2800,
    stock: 12,
    minStock: 2,
    isActive: true,
    supplier: 'Quesería La Tradición',
    allergens: ['Lactosa'],
    expirationDate: '2024-02-20',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-21'
  },
  {
    id: 'ing-6',
    name: 'Aceite de Oliva',
    description: 'Aceite de oliva extra virgen español',
    category: 'ACEITES',
    unit: 'L',
    price: 4200,
    cost: 3000,
    stock: 8,
    minStock: 2,
    isActive: true,
    supplier: 'Importadora Mediterránea',
    allergens: [],
    expirationDate: '2025-06-30',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15'
  },
  {
    id: 'ing-7',
    name: 'Cebollas',
    description: 'Cebollas blancas frescas',
    category: 'VERDURAS',
    unit: 'kg',
    price: 1200,
    cost: 800,
    stock: 30,
    minStock: 5,
    isActive: true,
    supplier: 'Huerta El Paraíso',
    allergens: [],
    expirationDate: '2024-03-01',
    createdAt: '2024-01-11',
    updatedAt: '2024-01-17'
  },
  {
    id: 'ing-8',
    name: 'Harina de Trigo',
    description: 'Harina de trigo para panadería y pastelería',
    category: 'HARINAS',
    unit: 'kg',
    price: 1500,
    cost: 1000,
    stock: 40,
    minStock: 8,
    isActive: true,
    supplier: 'Molino Central',
    allergens: ['Gluten'],
    expirationDate: '2024-10-31',
    createdAt: '2024-01-09',
    updatedAt: '2024-01-22'
  },
  {
    id: 'ing-9',
    name: 'Huevos Frescos',
    description: 'Huevos frescos de gallinas camperas',
    category: 'HUEVOS',
    unit: 'docena',
    price: 1800,
    cost: 1200,
    stock: 24,
    minStock: 4,
    isActive: true,
    supplier: 'Granja San Martín',
    allergens: ['Huevo'],
    expirationDate: '2024-02-25',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-20'
  },
  {
    id: 'ing-10',
    name: 'Leche Entera',
    description: 'Leche entera fresca pasteurizada',
    category: 'LÁCTEOS',
    unit: 'L',
    price: 1200,
    cost: 800,
    stock: 20,
    minStock: 3,
    isActive: true,
    supplier: 'Lácteos del Valle',
    allergens: ['Lactosa'],
    expirationDate: '2024-02-05',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-23'
  }
];

// Categorías de ingredientes
export const ingredientCategories = [
  'GRANOS',
  'PASTAS', 
  'VERDURAS',
  'CARNES',
  'LÁCTEOS',
  'ACEITES',
  'HARINAS',
  'HUEVOS',
  'ESPECIAS',
  'CONDIMENTOS',
  'BEBIDAS',
  'FRUTAS',
  'PESCADOS',
  'MARISCOS',
  'LEGUMBRES',
  'FRUTOS_SECOS'
];

// Unidades de medida
export const measurementUnits = [
  'kg',
  'g',
  'L',
  'ml',
  'unidad',
  'docena',
  'paquete',
  'lata',
  'botella',
  'caja'
];

// Alérgenos comunes
export const commonAllergens = [
  'Gluten',
  'Lactosa',
  'Huevo',
  'Pescado',
  'Mariscos',
  'Frutos secos',
  'Soya',
  'Mostaza',
  'Sésamo',
  'Apio',
  'Sulfitos'
];
