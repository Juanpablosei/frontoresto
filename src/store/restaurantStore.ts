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
  ownerId: string; // ID del usuario propietario
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
  getRestaurantsByOwner: (ownerId: string) => Restaurant[];
  getRestaurantById: (id: string) => Restaurant | undefined;
  getEmployeeById: (id: string) => Employee | undefined;
  clearAndReload: () => void;
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
    createdAt: '2024-01-15T00:00:00Z',
    ownerId: 'user-002' // María González
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
    createdAt: '2024-02-01T00:00:00Z',
    ownerId: 'user-002' // María González
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
    createdAt: '2024-01-20T00:00:00Z',
    ownerId: 'user-007' // Diego Morales
  },
  {
    id: '4',
    name: 'Delicias Gourmet',
    description: 'Restaurante de alta cocina con platos gourmet',
    address: 'Recoleta 321, Buenos Aires',
    phone: '+54 11 7777 8888',
    email: 'info@deliciasgourmet.com',
    website: 'https://www.deliciasgourmet.com',
    isOpen: true,
    isActive: true,
    createdAt: '2024-02-15T00:00:00Z',
    ownerId: 'user-007' // Diego Morales
  },
  {
    id: '5',
    name: 'Sushi Bar Sakura',
    description: 'Auténtica cocina japonesa y sushi fresco',
    address: 'Palermo 654, Buenos Aires',
    phone: '+54 11 9999 0000',
    email: 'info@sakura.com',
    website: 'https://www.sakura.com',
    isOpen: false,
    isActive: true,
    createdAt: '2024-03-01T00:00:00Z',
    ownerId: 'user-003' // Carlos Rodríguez
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
  // Empleados adicionales para el restaurante 1 (50 total)
  {
    id: '12',
    name: 'Sofía López',
    email: 'sofia.lopez@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 1111 1111',
    isActive: true,
    hireDate: '2024-01-10T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '13',
    name: 'Juan Carlos Morales',
    email: 'juan.morales@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 2222 2222',
    isActive: true,
    hireDate: '2024-02-05T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '14',
    name: 'Carmen Elena Vega',
    email: 'carmen.vega@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 3333 3333',
    isActive: true,
    hireDate: '2024-01-25T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '15',
    name: 'Roberto Silva',
    email: 'roberto.silva@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 4444 4444',
    isActive: true,
    hireDate: '2024-02-15T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '16',
    name: 'Elena Patricia Ruiz',
    email: 'elena.ruiz@elbuensabor.com',
    role: 'CASHIER',
    phone: '+54 11 5555 5555',
    isActive: true,
    hireDate: '2024-01-30T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '17',
    name: 'Diego Alejandro Torres',
    email: 'diego.torres@elbuensabor.com',
    role: 'HOST',
    phone: '+54 11 6666 6666',
    isActive: true,
    hireDate: '2024-03-10T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '18',
    name: 'Valentina Herrera',
    email: 'valentina.herrera@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 7777 7777',
    isActive: true,
    hireDate: '2024-01-12T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '19',
    name: 'Miguel Ángel Castro',
    email: 'miguel.castro@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 8888 8888',
    isActive: true,
    hireDate: '2024-02-20T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '20',
    name: 'Isabella Mendoza',
    email: 'isabella.mendoza@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 9999 9999',
    isActive: true,
    hireDate: '2024-01-18T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '21',
    name: 'Fernando José Rojas',
    email: 'fernando.rojas@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 1010 1010',
    isActive: true,
    hireDate: '2024-02-25T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '22',
    name: 'Camila Andrea Paredes',
    email: 'camila.paredes@elbuensabor.com',
    role: 'CASHIER',
    phone: '+54 11 1212 1212',
    isActive: true,
    hireDate: '2024-01-22T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '23',
    name: 'Sebastián Nicolás Flores',
    email: 'sebastian.flores@elbuensabor.com',
    role: 'HOST',
    phone: '+54 11 1313 1313',
    isActive: true,
    hireDate: '2024-03-05T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '24',
    name: 'Daniela Patricia Soto',
    email: 'daniela.soto@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 1414 1414',
    isActive: true,
    hireDate: '2024-01-28T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '25',
    name: 'Ricardo Alberto Vargas',
    email: 'ricardo.vargas@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 1515 1515',
    isActive: true,
    hireDate: '2024-02-08T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '26',
    name: 'Natalia Gabriela Jiménez',
    email: 'natalia.jimenez@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 1616 1616',
    isActive: true,
    hireDate: '2024-01-14T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '27',
    name: 'Andrés Felipe Moreno',
    email: 'andres.moreno@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 1717 1717',
    isActive: true,
    hireDate: '2024-02-12T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '28',
    name: 'Mariana Isabel Acosta',
    email: 'mariana.acosta@elbuensabor.com',
    role: 'CASHIER',
    phone: '+54 11 1818 1818',
    isActive: true,
    hireDate: '2024-01-16T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '29',
    name: 'Gustavo Enrique Ramírez',
    email: 'gustavo.ramirez@elbuensabor.com',
    role: 'HOST',
    phone: '+54 11 1919 1919',
    isActive: true,
    hireDate: '2024-03-12T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '30',
    name: 'Carolina Beatriz Medina',
    email: 'carolina.medina@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 2020 2020',
    isActive: true,
    hireDate: '2024-01-24T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '31',
    name: 'Héctor Manuel Ortega',
    email: 'hector.ortega@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 2121 2121',
    isActive: true,
    hireDate: '2024-02-18T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '32',
    name: 'Lucía Fernanda Reyes',
    email: 'lucia.reyes@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 2222 2222',
    isActive: true,
    hireDate: '2024-01-26T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '33',
    name: 'Oscar Daniel Guzmán',
    email: 'oscar.guzman@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 2323 2323',
    isActive: true,
    hireDate: '2024-02-22T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '34',
    name: 'Adriana Marcela Salazar',
    email: 'adriana.salazar@elbuensabor.com',
    role: 'CASHIER',
    phone: '+54 11 2424 2424',
    isActive: true,
    hireDate: '2024-01-19T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '35',
    name: 'Francisco Javier Delgado',
    email: 'francisco.delgado@elbuensabor.com',
    role: 'HOST',
    phone: '+54 11 2525 2525',
    isActive: true,
    hireDate: '2024-03-08T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '36',
    name: 'Verónica Alejandra Luna',
    email: 'veronica.luna@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 2626 2626',
    isActive: true,
    hireDate: '2024-01-21T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '37',
    name: 'Mauricio Esteban Espinoza',
    email: 'mauricio.espinoza@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 2727 2727',
    isActive: true,
    hireDate: '2024-02-14T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '38',
    name: 'Gabriela Patricia Valenzuela',
    email: 'gabriela.valenzuela@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 2828 2828',
    isActive: true,
    hireDate: '2024-01-17T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '39',
    name: 'Patricio Alejandro Figueroa',
    email: 'patricio.figueroa@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 2929 2929',
    isActive: true,
    hireDate: '2024-02-28T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '40',
    name: 'Constanza María Ríos',
    email: 'constanza.rios@elbuensabor.com',
    role: 'CASHIER',
    phone: '+54 11 3030 3030',
    isActive: true,
    hireDate: '2024-01-23T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '41',
    name: 'Ignacio Rodrigo Bravo',
    email: 'ignacio.bravo@elbuensabor.com',
    role: 'HOST',
    phone: '+54 11 3131 3131',
    isActive: true,
    hireDate: '2024-03-15T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '42',
    name: 'Antonella Sofía Cárdenas',
    email: 'antonella.cardenas@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 3232 3232',
    isActive: true,
    hireDate: '2024-01-27T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '43',
    name: 'Matías Alejandro Sandoval',
    email: 'matias.sandoval@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 3333 3333',
    isActive: true,
    hireDate: '2024-02-16T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '44',
    name: 'Javiera Belén Araya',
    email: 'javiera.araya@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 3434 3434',
    isActive: true,
    hireDate: '2024-01-29T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '45',
    name: 'Benjamín Ignacio Sepúlveda',
    email: 'benjamin.sepulveda@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 3535 3535',
    isActive: true,
    hireDate: '2024-02-24T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '46',
    name: 'Catalina Andrea Miranda',
    email: 'catalina.miranda@elbuensabor.com',
    role: 'CASHIER',
    phone: '+54 11 3636 3636',
    isActive: true,
    hireDate: '2024-01-31T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '47',
    name: 'Tomás Sebastián Fuentes',
    email: 'tomas.fuentes@elbuensabor.com',
    role: 'HOST',
    phone: '+54 11 3737 3737',
    isActive: true,
    hireDate: '2024-03-18T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '48',
    name: 'Emilia Valentina Tapia',
    email: 'emilia.tapia@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 3838 3838',
    isActive: true,
    hireDate: '2024-01-11T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '49',
    name: 'Agustín Felipe Venegas',
    email: 'agustin.venegas@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 3939 3939',
    isActive: true,
    hireDate: '2024-02-06T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '50',
    name: 'Renata Isabel Bustos',
    email: 'renata.bustos@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 4040 4040',
    isActive: true,
    hireDate: '2024-01-13T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '51',
    name: 'Maximiliano Andrés Campos',
    email: 'maximiliano.campos@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 4141 4141',
    isActive: true,
    hireDate: '2024-02-26T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '52',
    name: 'Amanda Josefina Cortés',
    email: 'amanda.cortes@elbuensabor.com',
    role: 'CASHIER',
    phone: '+54 11 4242 4242',
    isActive: true,
    hireDate: '2024-01-09T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '53',
    name: 'Cristóbal Alejandro Molina',
    email: 'cristobal.molina@elbuensabor.com',
    role: 'HOST',
    phone: '+54 11 4343 4343',
    isActive: true,
    hireDate: '2024-03-20T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '54',
    name: 'Florencia Belén Silva',
    email: 'florencia.silva@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 4444 4444',
    isActive: true,
    hireDate: '2024-01-08T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '55',
    name: 'Vicente Nicolás Herrera',
    email: 'vicente.herrera@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 4545 4545',
    isActive: true,
    hireDate: '2024-02-30T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '56',
    name: 'Sara Valentina Poblete',
    email: 'sara.poblete@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 4646 4646',
    isActive: true,
    hireDate: '2024-01-07T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '57',
    name: 'Alonso Felipe Vidal',
    email: 'alonso.vidal@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 4747 4747',
    isActive: true,
    hireDate: '2024-02-04T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '58',
    name: 'Martina Sofía Contreras',
    email: 'martina.contreras@elbuensabor.com',
    role: 'CASHIER',
    phone: '+54 11 4848 4848',
    isActive: true,
    hireDate: '2024-01-06T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '59',
    name: 'Joaquín Alejandro Soto',
    email: 'joaquin.soto@elbuensabor.com',
    role: 'HOST',
    phone: '+54 11 4949 4949',
    isActive: true,
    hireDate: '2024-03-22T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '60',
    name: 'Isidora María Lagos',
    email: 'isidora.lagos@elbuensabor.com',
    role: 'WAITER',
    phone: '+54 11 5050 5050',
    isActive: true,
    hireDate: '2024-01-05T00:00:00Z',
    restaurantId: '1'
  },
  {
    id: '61',
    name: 'Lucas Gabriel Muñoz',
    email: 'lucas.munoz@elbuensabor.com',
    role: 'COOK',
    phone: '+54 11 5151 5151',
    isActive: true,
    hireDate: '2024-02-02T00:00:00Z',
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
      
      getRestaurantsByOwner: (ownerId) => {
        const state = get();
        return state.restaurants.filter(restaurant => restaurant.ownerId === ownerId);
      },
      
      getRestaurantById: (id) => {
        const state = get();
        return state.restaurants.find(restaurant => restaurant.id === id);
      },
      
      getEmployeeById: (id) => {
        const state = get();
        return state.employees.find(employee => employee.id === id);
      },

      // Función para limpiar localStorage y recargar datos
      clearAndReload: () => {
        localStorage.removeItem('restaurant-store');
        window.location.reload();
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
