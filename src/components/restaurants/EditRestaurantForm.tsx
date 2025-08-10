import React from 'react';
import { useForm } from 'react-hook-form';

interface EditRestaurantData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

interface EditRestaurantFormProps {
  onSubmit: (data: EditRestaurantData) => void;
  onCancel: () => void;
  initialData?: EditRestaurantData;
}

const EditRestaurantForm: React.FC<EditRestaurantFormProps> = ({
  onSubmit,
  onCancel,
  initialData
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditRestaurantData>({
    defaultValues: initialData
  });

  return (
    <div className="edit-form-overlay">
      <div className="edit-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Nombre del Restaurante *"
              {...register('name', { 
                required: 'El nombre es requerido',
                minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
              })}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <textarea
              id="description"
              placeholder="Descripción *"
              {...register('description', { 
                required: 'La descripción es requerida',
                minLength: { value: 10, message: 'La descripción debe tener al menos 10 caracteres' }
              })}
              className={errors.description ? 'error' : ''}
              rows={3}
            />
            {errors.description && <span className="error-message">{errors.description.message}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              id="address"
              placeholder="Dirección *"
              {...register('address', { 
                required: 'La dirección es requerida',
                minLength: { value: 10, message: 'La dirección debe tener al menos 10 caracteres' }
              })}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="error-message">{errors.address.message}</span>}
          </div>

          <div className="form-group">
            <input
              type="tel"
              id="phone"
              placeholder="Teléfono *"
              {...register('phone', { 
                required: 'El teléfono es requerido',
                pattern: { 
                  value: /^[\+]?[0-9\s\-\(\)]+$/, 
                  message: 'Ingresa un número de teléfono válido' 
                }
              })}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone.message}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email *"
              {...register('email', { 
                required: 'El email es requerido',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: 'Ingresa un email válido' 
                }
              })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <input
              type="url"
              id="website"
              placeholder="Sitio Web"
              {...register('website', {
                pattern: { 
                  value: /^https?:\/\/.+/i, 
                  message: 'Ingresa una URL válida (debe comenzar con http:// o https://)' 
                }
              })}
              className={errors.website ? 'error' : ''}
            />
            {errors.website && <span className="error-message">{errors.website.message}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="save-btn">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurantForm;
