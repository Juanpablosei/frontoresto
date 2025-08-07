import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons';
import { RegisterFormData, RegisterFormProps } from './types';
import './RegisterForm.css';

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<RegisterFormData>({
    mode: 'onChange'
  });

  const password = watch('password');

  const onSubmitForm = (data: RegisterFormData) => {
    onSubmit(data);
  };

  return (
    <div className="register-form">
      <div className="register-form__header">
        <h1>🍽️ Registrarse</h1>
        <p>Únete a nuestro restaurante. Completa tus datos para comenzar a disfrutar.</p>
      </div>

      {error && (
        <div className="register-form__error">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitForm)} className="register-form__content">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            👤 Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            className={`form-input ${errors.name ? 'form-input--error' : ''}`}
            placeholder="Tu nombre completo"
            {...register('name', {
              required: 'El nombre es requerido',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres'
              }
            })}
          />
          {errors.name && (
            <span className="form-error">{errors.name.message}</span>
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
            placeholder="tu@email.com"
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

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            🔒 Contraseña
          </label>
          <input
            id="password"
            type="password"
            className={`form-input ${errors.password ? 'form-input--error' : ''}`}
            placeholder="••••••••"
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: 'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales'
              }
            })}
          />
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            🔐 Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`form-input ${errors.confirmPassword ? 'form-input--error' : ''}`}
            placeholder="••••••••"
            {...register('confirmPassword', {
              required: 'Confirma tu contraseña',
              validate: value => value === password || 'Las contraseñas no coinciden'
            })}
          />
          {errors.confirmPassword && (
            <span className="form-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              {...register('acceptTerms', {
                required: 'Debes aceptar los términos y condiciones'
              })}
            />
            <span className="checkmark"></span>
            Acepto los <a href="/auth/terms" className="terms-link">términos y condiciones</a> y la <a href="/auth/privacy" className="terms-link">política de privacidad</a>
          </label>
          {errors.acceptTerms && (
            <span className="form-error">{errors.acceptTerms.message}</span>
          )}
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
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </div>

        <div className="form-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <a href="/auth/login" className="form-link">
              Iniciar Sesión
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 