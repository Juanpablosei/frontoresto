// Tipos para platos
export interface PlatoIngredient {
  ingredientId: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface MockPlato {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number; // Costo calculado basado en ingredientes
  isActive: boolean;
  ingredients: PlatoIngredient[];
  preparationTime: number; // en minutos
  allergens: string[];
  difficulty: 'FÁCIL' | 'MEDIO' | 'DIFÍCIL';
  servings: number;
  instructions: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Categorías de platos
export const platoCategories = [
  'PRINCIPAL',
  'ENTRADA',
  'POSTRE',
  'BEBIDA',
  'ACOMPAÑAMIENTO',
  'ENSALADA',
  'SOPA',
  'PASTA',
  'CARNE',
  'PESCADO',
  'VEGETARIANO'
] as const;

// Niveles de dificultad
export const difficultyLevels = ['FÁCIL', 'MEDIO', 'DIFÍCIL'] as const;

// Datos mock de platos
export const mockPlatos: MockPlato[] = [
  {
    id: '1',
    name: 'Milanesa con Puré',
    description: 'Milanesa de ternera empanada con puré de papas casero',
    category: 'PRINCIPAL',
    price: 15.99,
    cost: 8.50,
    isActive: true,
    ingredients: [
      {
        ingredientId: '1', // Milanesa
        name: 'Milanesa de Ternera',
        quantity: 1,
        unit: 'unidad',
        cost: 5.00
      },
      {
        ingredientId: '2', // Papa
        name: 'Papa',
        quantity: 2,
        unit: 'unidades',
        cost: 1.50
      },
      {
        ingredientId: '3', // Leche
        name: 'Leche',
        quantity: 0.5,
        unit: 'taza',
        cost: 0.50
      },
      {
        ingredientId: '4', // Mantequilla
        name: 'Mantequilla',
        quantity: 30,
        unit: 'gramos',
        cost: 1.50
      }
    ],
    preparationTime: 25,
    allergens: ['GLUTEN', 'LÁCTEOS'],
    difficulty: 'MEDIO',
    servings: 1,
    instructions: '1. Empanar la milanesa\n2. Freír hasta dorar\n3. Hervir papas\n4. Hacer puré con leche y mantequilla',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Pasta Carbonara',
    description: 'Pasta italiana con salsa cremosa, panceta y queso parmesano',
    category: 'PASTA',
    price: 18.50,
    cost: 9.20,
    isActive: true,
    ingredients: [
      {
        ingredientId: '5', // Pasta
        name: 'Pasta Spaghetti',
        quantity: 200,
        unit: 'gramos',
        cost: 2.00
      },
      {
        ingredientId: '6', // Panceta
        name: 'Panceta',
        quantity: 100,
        unit: 'gramos',
        cost: 3.50
      },
      {
        ingredientId: '7', // Huevos
        name: 'Huevos',
        quantity: 2,
        unit: 'unidades',
        cost: 1.20
      },
      {
        ingredientId: '8', // Queso parmesano
        name: 'Queso Parmesano',
        quantity: 50,
        unit: 'gramos',
        cost: 2.50
      }
    ],
    preparationTime: 20,
    allergens: ['GLUTEN', 'HUEVOS', 'LÁCTEOS'],
    difficulty: 'MEDIO',
    servings: 1,
    instructions: '1. Cocinar pasta al dente\n2. Freír panceta\n3. Mezclar huevos y queso\n4. Combinar todos los ingredientes',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: '3',
    name: 'Ensalada César',
    description: 'Ensalada fresca con lechuga, crutones, parmesano y aderezo César',
    category: 'ENSALADA',
    price: 12.99,
    cost: 6.80,
    isActive: true,
    ingredients: [
      {
        ingredientId: '9', // Lechuga
        name: 'Lechuga Romana',
        quantity: 1,
        unit: 'cabeza',
        cost: 2.00
      },
      {
        ingredientId: '10', // Crutones
        name: 'Crutones',
        quantity: 50,
        unit: 'gramos',
        cost: 1.50
      },
      {
        ingredientId: '8', // Queso parmesano
        name: 'Queso Parmesano',
        quantity: 30,
        unit: 'gramos',
        cost: 1.50
      },
      {
        ingredientId: '11', // Aderezo César
        name: 'Aderezo César',
        quantity: 60,
        unit: 'ml',
        cost: 1.80
      }
    ],
    preparationTime: 10,
    allergens: ['GLUTEN', 'LÁCTEOS'],
    difficulty: 'FÁCIL',
    servings: 1,
    instructions: '1. Lavar y cortar lechuga\n2. Agregar crutones\n3. Espolvorear parmesano\n4. Agregar aderezo',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  },
  {
    id: '4',
    name: 'Tiramisú',
    description: 'Postre italiano con capas de bizcocho, café y crema de mascarpone',
    category: 'POSTRE',
    price: 8.99,
    cost: 4.50,
    isActive: true,
    ingredients: [
      {
        ingredientId: '12', // Bizcocho
        name: 'Bizcocho de Vainilla',
        quantity: 200,
        unit: 'gramos',
        cost: 2.00
      },
      {
        ingredientId: '13', // Queso mascarpone
        name: 'Queso Mascarpone',
        quantity: 250,
        unit: 'gramos',
        cost: 3.50
      },
      {
        ingredientId: '14', // Café
        name: 'Café Expresso',
        quantity: 100,
        unit: 'ml',
        cost: 1.00
      },
      {
        ingredientId: '15', // Cacao
        name: 'Cacao en Polvo',
        quantity: 20,
        unit: 'gramos',
        cost: 0.50
      }
    ],
    preparationTime: 30,
    allergens: ['GLUTEN', 'LÁCTEOS', 'HUEVOS'],
    difficulty: 'DIFÍCIL',
    servings: 4,
    instructions: '1. Preparar café\n2. Hacer crema de mascarpone\n3. Mojar bizcochos en café\n4. Armar capas y refrigerar',
    createdAt: '2024-01-15T13:00:00Z',
    updatedAt: '2024-01-15T13:00:00Z'
  },
  {
    id: '5',
    name: 'Limonada Natural',
    description: 'Bebida refrescante con limones frescos y azúcar',
    category: 'BEBIDA',
    price: 4.50,
    cost: 1.80,
    isActive: true,
    ingredients: [
      {
        ingredientId: '16', // Limones
        name: 'Limones',
        quantity: 3,
        unit: 'unidades',
        cost: 1.20
      },
      {
        ingredientId: '17', // Azúcar
        name: 'Azúcar',
        quantity: 50,
        unit: 'gramos',
        cost: 0.30
      },
      {
        ingredientId: '18', // Agua
        name: 'Agua',
        quantity: 500,
        unit: 'ml',
        cost: 0.30
      }
    ],
    preparationTime: 5,
    allergens: [],
    difficulty: 'FÁCIL',
    servings: 2,
    instructions: '1. Exprimir limones\n2. Disolver azúcar en agua\n3. Mezclar todo\n4. Servir con hielo',
    createdAt: '2024-01-15T14:00:00Z',
    updatedAt: '2024-01-15T14:00:00Z'
  }
];
