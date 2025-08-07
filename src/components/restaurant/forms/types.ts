export interface RestaurantFormData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  clientId: string;
}

export interface RestaurantFormProps {
  onSubmit: (data: RestaurantFormData) => void;
  isLoading?: boolean;
  error?: string;
}
