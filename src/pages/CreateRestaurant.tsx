import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { Header, RestaurantForm } from '../components/create-restaurant';

interface CreateRestaurantData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

const CreateRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();



  const handleSubmit = async (data: CreateRestaurantData) => {
    try {
      // Simular envío al backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Agregar el clientId del usuario autenticado
      const restaurantData = {
        ...data,
        clientId: user?.id || ''
      };
      
      console.log('Restaurante creado:', restaurantData);
      
      // Mostrar mensaje de éxito (aquí podrías usar un toast)
      alert(t('success.created'));
      
      // Redirigir de vuelta a la vista de restaurantes
      navigate('/restaurants');
    } catch (error) {
      console.error('Error al crear restaurante:', error);
      alert(t('errors.general'));
    }
  };

  const handleCancel = () => {
    navigate('/restaurants');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 pt-20">
      <Header />
      
      <div className="max-w-4xl mx-auto px-8 py-8">
        <RestaurantForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default CreateRestaurant;
