import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons';
import { RestaurantFormData, RestaurantFormProps } from './types';
import './RestaurantForm.css';

const RestaurantForm: React.FC<RestaurantFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<RestaurantFormData>({
    mode: 'onChange'
  });

  const onSubmitForm = (data: RestaurantFormData) => {
    onSubmit(data);
  };

  return (
    <div className="restaurant-form">
      <div className="restaurant-form__header">
        <h1>🏪 Crear Restaurante</h1>
        <p>Registra tu restaurante en nuestra plataforma. Completa todos los datos requeridos.</p>
      </div>

      {error && (
        <div className="restaurant-form__error">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitForm)} className="restaurant-form__content">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            🏪 Nombre del Restaurante
          </label>
          <input
            id="name"
            type="text"
            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
            placeholder="Ej: Restaurante El Buen Sabor"
            {...register('name', {
              required: 'El nombre del restaurante es requerido',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres'
              }
            })}
          />
          {errors.name && (
            <span className="form-error">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            📝 Descripción
          </label>
          <textarea
            id="description"
            className={`form-textarea ${errors.description ? 'form-textarea--error' : ''}`}
            placeholder="Describe tu restaurante, especialidades, ambiente..."
            rows={4}
            {...register('description', {
              required: 'La descripción es requerida',
              minLength: {
                value: 10,
                message: 'La descripción debe tener al menos 10 caracteres'
              },
              maxLength: {
                value: 500,
                message: 'La descripción no puede exceder 500 caracteres'
              }
            })}
          />
          {errors.description && (
            <span className="form-error">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            📍 Dirección
          </label>
          <input
            id="address"
            type="text"
            className={`form-input ${errors.address ? 'form-input--error' : ''}`}
            placeholder="Calle Principal 123, Ciudad"
            {...register('address', {
              required: 'La dirección es requerida',
              minLength: {
                value: 10,
                message: 'La dirección debe tener al menos 10 caracteres'
              }
            })}
          />
          {errors.address && (
            <span className="form-error">{errors.address.message}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              📞 Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
              placeholder="+1 234 567 8900"
              {...register('phone', {
                required: 'El teléfono es requerido',
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: 'Ingresa un número de teléfono válido'
                }
              })}
            />
            {errors.phone && (
              <span className="form-error">{errors.phone.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              📧 Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              placeholder="info@restaurante.com"
              {...register('email', {
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Ingresa un correo electrónico válido'
                }
              })}
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="website" className="form-label">
              🌐 Sitio Web
            </label>
            <input
              id="website"
              type="url"
              className={`form-input ${errors.website ? 'form-input--error' : ''}`}
              placeholder="https://www.restaurante.com"
              {...register('website', {
                required: 'El sitio web es requerido',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Ingresa una URL válida (debe comenzar con http:// o https://)'
                }
              })}
            />
            {errors.website && (
              <span className="form-error">{errors.website.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="clientId" className="form-label">
              🆔 ID del Cliente
            </label>
            <input
              id="clientId"
              type="text"
              className={`form-input ${errors.clientId ? 'form-input--error' : ''}`}
              placeholder="123e4567-e89b-12d3-a456-426614174000"
              {...register('clientId', {
                required: 'El ID del cliente es requerido',
                pattern: {
                  value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
                  message: 'Ingresa un UUID válido'
                }
              })}
            />
            {errors.clientId && (
              <span className="form-error">{errors.clientId.message}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Creando restaurante...' : 'Crear Restaurante'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantForm;
