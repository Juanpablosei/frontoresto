import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons';
import { LoginFormData, LoginFormProps } from './types';
import './LoginForm.css';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();

  return (
    <div className="login-form">
      <div className="login-form__header">
        <h1>🍽️ Iniciar Sesión</h1>
        <p>Accede a tu cuenta para gestionar tu restaurante</p>
      </div>

      {error && (
        <div className="login-form__error">
          <span>⚠️ {error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="login-form__content">
        <div className="form-group">
          <label htmlFor="email">📧 Correo Electrónico</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'El correo electrónico es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ingresa un correo electrónico válido'
              }
            })}
            placeholder="tu@email.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">🔒 Contraseña</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              }
            })}
            placeholder="••••••••"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...register('rememberMe')}
            />
            <span className="checkmark"></span>
            Recordarme
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          loading={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : '🚀 Iniciar Sesión'}
        </Button>
      </form>

      <div className="login-form__footer">
        <p>¿No tienes una cuenta?</p>
        <a href="/auth/registro" className="form-link">
          Crear Cuenta
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
