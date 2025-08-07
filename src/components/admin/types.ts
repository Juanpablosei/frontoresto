export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  restaurants: Restaurant[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  isOpen: boolean;
  createdAt: string;
  employees: Employee[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminPanelProps {
  onLogout?: () => void;
}

export interface OwnersListProps {
  owners: Owner[];
  onOwnerSelect: (owner: Owner) => void;
  selectedOwner: Owner | null;
}

export interface OwnerDetailsProps {
  owner: Owner;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  selectedRestaurant: Restaurant | null;
}

export interface RestaurantDetailsProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export interface EmployeeListProps {
  employees: Employee[];
  restaurantName: string;
  onBack: () => void;
}
