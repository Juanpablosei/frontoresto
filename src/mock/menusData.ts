// Datos mock para menús

export interface MenuPlato {
  platoId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isActive: boolean;
}

export interface MockMenu {
  id: string;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  platos: MenuPlato[];
  createdAt: string;
  updatedAt: string;
}

export const menuCategories = [
  'PRINCIPAL',
  'EJECUTIVO', 
  'ESPECIAL',
  'POSTRES',
  'BEBIDAS',
  'INFANTIL',
  'FESTIVO'
];

export const mockMenus: MockMenu[] = [
  {
    id: 'menu-1',
    name: 'Menú Principal',
    description: 'Platos principales y especialidades de la casa',
    category: 'PRINCIPAL',
    isActive: true,
    platos: [
      {
        platoId: 'plato-1',
        name: 'Milanesa con Puré de Papas',
        description: 'Milanesa de ternera empanada con puré de papas casero',
        price: 2500,
        category: 'PRINCIPAL',
        isActive: true
      },
      {
        platoId: 'plato-2', 
        name: 'Pasta Carbonara',
        description: 'Pasta con salsa cremosa, panceta y queso parmesano',
        price: 1800,
        category: 'PRINCIPAL',
        isActive: true
      }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 'menu-2',
    name: 'Menú Ejecutivo',
    description: 'Opciones rápidas para el almuerzo de trabajo',
    category: 'EJECUTIVO',
    isActive: true,
    platos: [
      {
        platoId: 'plato-3',
        name: 'Ensalada César',
        description: 'Lechuga, crutones, parmesano y aderezo César',
        price: 1200,
        category: 'PRINCIPAL',
        isActive: true
      }
    ],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: 'menu-3',
    name: 'Carta de Vinos',
    description: 'Selección de vinos nacionales e importados',
    category: 'BEBIDAS',
    isActive: true,
    platos: [],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15'
  },
  {
    id: 'menu-4',
    name: 'Menú Vegetariano',
    description: 'Opciones saludables sin carne',
    category: 'ESPECIAL',
    isActive: false,
    platos: [
      {
        platoId: 'plato-4',
        name: 'Risotto de Hongos',
        description: 'Arroz cremoso con hongos portobello y parmesano',
        price: 2000,
        category: 'PRINCIPAL',
        isActive: true
      }
    ],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-25'
  },
  {
    id: 'menu-5',
    name: 'Postres',
    description: 'Dulces caseros y helados artesanales',
    category: 'POSTRES',
    isActive: true,
    platos: [
      {
        platoId: 'plato-5',
        name: 'Tiramisú',
        description: 'Postre italiano con café, mascarpone y cacao',
        price: 800,
        category: 'POSTRES',
        isActive: true
      }
    ],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-22'
  }
];
