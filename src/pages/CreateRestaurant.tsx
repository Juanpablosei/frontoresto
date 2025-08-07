import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../components/buttons';
import UserInfo from '../components/auth/UserInfo';
import { useAuth } from '../hooks/useAuth';
import './CreateRestaurant.css';

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
    <div className="create-restaurant-page">
      <div className="create-restaurant-header">
        <div className="header-content">
          <div className="header-info">
            <h1>➕ Crear Nuevo Restaurante</h1>
            <p>Completa la información de tu nuevo restaurante</p>
          </div>
          <div className="header-actions">
            <UserInfo />
          </div>
        </div>
      </div>

      <div className="create-restaurant-content">
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="restaurant-form">
            <div className="form-section">
              <h3>📋 Información Básica</h3>
              
              <div className="form-group">
                <label htmlFor="name">🏪 Nombre del Restaurante *</label>
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
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">📝 Descripción</label>
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
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && (
                  <span className="error-message">{errors.description.message}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>📍 Información de Contacto</h3>
              
              <div className="form-group">
                <label htmlFor="address">🏠 Dirección *</label>
                <input
                  id="address"
                  type="text"
                  {...register('address', {
                    required: 'La dirección es requerida'
                  })}
                  placeholder="Ej: Calle Principal 123, Ciudad"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && (
                  <span className="error-message">{errors.address.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">📞 Teléfono *</label>
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
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">📧 Email *</label>
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
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="website">🌐 Sitio Web</label>
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
                  className={errors.website ? 'error' : ''}
                />
                {errors.website && (
                  <span className="error-message">{errors.website.message}</span>
                )}
                             </div>
             </div>

             <div className="form-actions">
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
