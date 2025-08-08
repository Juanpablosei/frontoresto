import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../components/buttons';
import UserInfo from '../components/auth/UserInfo';
import { useAuth } from '../hooks/useAuth';

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateRestaurantData>();

  const onSubmit = async (data: CreateRestaurantData) => {
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
      alert('¡Restaurante creado exitosamente!');
      
      // Redirigir de vuelta a la vista de restaurantes
      navigate('/restaurants');
    } catch (error) {
      console.error('Error al crear restaurante:', error);
      alert('Error al crear el restaurante. Por favor, intenta de nuevo.');
    }
  };

  const handleCancel = () => {
    navigate('/restaurants');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 pt-20">
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 py-8">
        <div className="max-w-6xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 shadow-lg">➕ Crear Nuevo Restaurante</h1>
            <p className="text-white/90 text-lg">Completa la información de tu nuevo restaurante</p>
          </div>
          <div className="flex gap-4">
            <UserInfo />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="border-b border-amber-200 pb-8 mb-4">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6 pb-2 border-b-2 border-amber-600">📋 Información Básica</h3>
              
              <div className="mb-6">
                <label htmlFor="name" className="block font-semibold text-amber-800 mb-2 text-base">🏪 Nombre del Restaurante *</label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'El nombre del restaurante es requerido',
                    minLength: {
                      value: 3,
                      message: 'El nombre debe tener al menos 3 caracteres'
                    }
                  })}
                  placeholder="Ej: Restaurante El Buen Sabor"
                  className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block font-semibold text-amber-800 mb-2 text-base">📝 Descripción</label>
                <textarea
                  id="description"
                  {...register('description', {
                    required: 'La descripción es requerida',
                    minLength: {
                      value: 10,
                      message: 'La descripción debe tener al menos 10 caracteres'
                    }
                  })}
                  placeholder="Describe tu restaurante, especialidades, etc."
                  rows={4}
                  className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 resize-vertical min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.description.message}</span>
                )}
              </div>
            </div>

            <div className="border-b border-amber-200 pb-8 mb-4">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6 pb-2 border-b-2 border-amber-600">📍 Información de Contacto</h3>
              
              <div className="mb-6">
                <label htmlFor="address" className="block font-semibold text-amber-800 mb-2 text-base">🏠 Dirección *</label>
                <input
                  id="address"
                  type="text"
                  {...register('address', {
                    required: 'La dirección es requerida'
                  })}
                  placeholder="Ej: Calle Principal 123, Ciudad"
                  className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.address ? 'border-red-500' : ''}`}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.address.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block font-semibold text-amber-800 mb-2 text-base">📞 Teléfono *</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', {
                      required: 'El teléfono es requerido',
                      pattern: {
                        value: /^[\+]?[1-9][\d]{0,15}$/,
                        message: 'Ingresa un número de teléfono válido'
                      }
                    })}
                    placeholder="Ej: +1 234 567 8900"
                    className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.phone.message}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold text-amber-800 mb-2 text-base">📧 Email *</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'El email es requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Ingresa un email válido'
                      }
                    })}
                    placeholder="Ej: info@restaurante.com"
                    className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="website" className="block font-semibold text-amber-800 mb-2 text-base">🌐 Sitio Web</label>
                <input
                  id="website"
                  type="url"
                  {...register('website', {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Ingresa una URL válida (debe comenzar con http:// o https://)'
                    }
                  })}
                  placeholder="Ej: https://www.restaurante.com"
                  className={`w-full p-3 border-2 border-amber-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-600 focus:shadow-lg focus:shadow-amber-600/10 ${errors.website ? 'border-red-500' : ''}`}
                />
                {errors.website && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.website.message}</span>
                )}
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-8 border-t border-amber-200 flex-wrap">
              <Button
                type="button"
                variant="secondary"
                size="large"
                onClick={handleCancel}
              >
                ❌ Cancelar
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? '🔄 Creando...' : '✅ Crear Restaurante'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
