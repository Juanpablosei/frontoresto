import { Owner, Restaurant, Employee } from '../components/admin/types';

export const mockOwners: Owner[] = [
  {
    id: 'owner-001',
    name: 'María González',
    email: 'maria@buensabor.com',
    phone: '+1 234 567 8901',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    restaurants: [
      {
        id: 'rest-001',
        name: 'Restaurante El Buen Sabor',
        description: 'Restaurante especializado en comida tradicional con más de 20 años de experiencia. Ofrecemos los mejores platos de la región con ingredientes frescos y de la más alta calidad.',
        address: 'Calle Principal 123, Ciudad',
        phone: '+1 234 567 8900',
        email: 'info@buensabor.com',
        isOpen: true,
        createdAt: '2024-01-02T00:00:00Z',
        employees: [
          {
            id: 'emp-001',
            name: 'Carlos Rodríguez',
            email: 'carlos@buensabor.com',
            role: 'MANAGER',
            isActive: true,
            createdAt: '2024-01-03T00:00:00Z',
            lastLogin: '2024-01-15T10:30:00Z'
          },
          {
            id: 'emp-002',
            name: 'Ana Martínez',
            email: 'ana@buensabor.com',
            role: 'WAITER',
            isActive: true,
            createdAt: '2024-01-04T00:00:00Z',
            lastLogin: '2024-01-15T09:15:00Z'
          },
          {
            id: 'emp-003',
            name: 'Luis Pérez',
            email: 'luis@buensabor.com',
            role: 'COOK',
            isActive: true,
            createdAt: '2024-01-05T00:00:00Z',
            lastLogin: '2024-01-15T08:45:00Z'
          },
          {
            id: 'emp-004',
            name: 'Sofia García',
            email: 'sofia@buensabor.com',
            role: 'CASHIER',
            isActive: true,
            createdAt: '2024-01-06T00:00:00Z',
            lastLogin: '2024-01-15T11:20:00Z'
          }
        ]
      },
      {
        id: 'rest-002',
        name: 'Café Express',
        description: 'Café moderno con ambiente acogedor, especializado en café de origen y pastelería artesanal. Perfecto para reuniones de trabajo y momentos de relax.',
        address: 'Avenida Central 456, Ciudad',
        phone: '+1 234 567 8902',
        email: 'info@cafeexpress.com',
        isOpen: false,
        createdAt: '2024-01-10T00:00:00Z',
        employees: [
          {
            id: 'emp-005',
            name: 'Roberto Silva',
            email: 'roberto@cafeexpress.com',
            role: 'MANAGER',
            isActive: true,
            createdAt: '2024-01-11T00:00:00Z',
            lastLogin: '2024-01-14T16:30:00Z'
          },
          {
            id: 'emp-006',
            name: 'Carmen López',
            email: 'carmen@cafeexpress.com',
            role: 'WAITER',
            isActive: false,
            createdAt: '2024-01-12T00:00:00Z',
            lastLogin: '2024-01-10T14:20:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'owner-002',
    name: 'Juan Carlos Mendoza',
    email: 'juan@delicias.com',
    phone: '+1 234 567 8903',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    restaurants: [
      {
        id: 'rest-003',
        name: 'Delicias Gourmet',
        description: 'Restaurante de alta cocina que combina técnicas tradicionales con innovación culinaria. Experiencia gastronómica única con ingredientes premium.',
        address: 'Plaza Mayor 789, Ciudad',
        phone: '+1 234 567 8904',
        email: 'info@deliciasgourmet.com',
        isOpen: true,
        createdAt: '2024-01-16T00:00:00Z',
        employees: [
          {
            id: 'emp-007',
            name: 'Isabella Torres',
            email: 'isabella@deliciasgourmet.com',
            role: 'MANAGER',
            isActive: true,
            createdAt: '2024-01-17T00:00:00Z',
            lastLogin: '2024-01-15T12:45:00Z'
          },
          {
            id: 'emp-008',
            name: 'Miguel Ángel Ruiz',
            email: 'miguel@deliciasgourmet.com',
            role: 'COOK',
            isActive: true,
            createdAt: '2024-01-18T00:00:00Z',
            lastLogin: '2024-01-15T11:30:00Z'
          },
          {
            id: 'emp-009',
            name: 'Valentina Herrera',
            email: 'valentina@deliciasgourmet.com',
            role: 'WAITER',
            isActive: true,
            createdAt: '2024-01-19T00:00:00Z',
            lastLogin: '2024-01-15T13:15:00Z'
          },
          {
            id: 'emp-010',
            name: 'Diego Morales',
            email: 'diego@deliciasgourmet.com',
            role: 'HOST',
            isActive: true,
            createdAt: '2024-01-20T00:00:00Z',
            lastLogin: '2024-01-15T10:00:00Z'
          },
          {
            id: 'emp-011',
            name: 'Camila Vega',
            email: 'camila@deliciasgourmet.com',
            role: 'CASHIER',
            isActive: false,
            createdAt: '2024-01-21T00:00:00Z',
            lastLogin: '2024-01-12T15:45:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'owner-003',
    name: 'Patricia Fernández',
    email: 'patricia@casita.com',
    phone: '+1 234 567 8905',
    isActive: false,
    createdAt: '2024-01-25T00:00:00Z',
    restaurants: [
      {
        id: 'rest-004',
        name: 'La Casita Familiar',
        description: 'Restaurante familiar con ambiente hogareño, especializado en platos caseros y recetas tradicionales que han pasado de generación en generación.',
        address: 'Calle de los Recuerdos 321, Ciudad',
        phone: '+1 234 567 8906',
        email: 'info@lacasita.com',
        isOpen: false,
        createdAt: '2024-01-26T00:00:00Z',
        employees: [
          {
            id: 'emp-012',
            name: 'Fernando Castro',
            email: 'fernando@lacasita.com',
            role: 'MANAGER',
            isActive: false,
            createdAt: '2024-01-27T00:00:00Z',
            lastLogin: '2024-01-08T09:30:00Z'
          },
          {
            id: 'emp-013',
            name: 'Lucía Mendoza',
            email: 'lucia@lacasita.com',
            role: 'COOK',
            isActive: false,
            createdAt: '2024-01-28T00:00:00Z',
            lastLogin: '2024-01-08T08:15:00Z'
          }
        ]
      }
    ]
  }
];
