import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons';
import { RegisterFormData, RegisterFormProps } from './types';

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
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-10 shadow-2xl border border-white/20 max-w-lg w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🍽️ Registrarse</h1>
        <p className="text-gray-600">Únete a nuestro restaurante. Completa tus datos para comenzar a disfrutar.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 flex items-center gap-2 text-sm">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-800 font-semibold text-sm flex items-center gap-2">
            👤 Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            className={`p-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-800 focus:shadow-lg focus:shadow-amber-800/10 ${errors.name ? 'border-red-500' : ''}`}
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
            <span className="text-red-500 text-sm font-medium">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-800 font-semibold text-sm flex items-center gap-2">
            📧 Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            className={`p-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-800 focus:shadow-lg focus:shadow-amber-800/10 ${errors.email ? 'border-red-500' : ''}`}
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
            <span className="text-red-500 text-sm font-medium">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-800 font-semibold text-sm flex items-center gap-2">
            🔒 Contraseña
          </label>
          <input
            id="password"
            type="password"
            className={`p-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-800 focus:shadow-lg focus:shadow-amber-800/10 ${errors.password ? 'border-red-500' : ''}`}
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
            <span className="text-red-500 text-sm font-medium">{errors.password.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-gray-800 font-semibold text-sm flex items-center gap-2">
            🔐 Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`p-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-800 focus:shadow-lg focus:shadow-amber-800/10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            placeholder="••••••••"
            {...register('confirmPassword', {
              required: 'Confirma tu contraseña',
              validate: value => value === password || 'Las contraseñas no coinciden'
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm font-medium">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className="flex items-start gap-3">
          <label className="flex items-start gap-3 cursor-pointer text-gray-600 text-sm leading-relaxed">
            <input
              type="checkbox"
              {...register('acceptTerms', {
                required: 'Debes aceptar los términos y condiciones'
              })}
              className="hidden"
            />
            <span className="w-5 h-5 border-2 border-gray-200 rounded relative transition-all duration-300 mt-0.5 flex-shrink-0">
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-0 peer-checked:opacity-100">✓</span>
            </span>
            Acepto los <a href="/auth/terms" className="text-amber-800 font-semibold transition-colors duration-300 hover:text-amber-700 hover:underline">términos y condiciones</a> y la <a href="/auth/privacy" className="text-amber-800 font-semibold transition-colors duration-300 hover:text-amber-700 hover:underline">política de privacidad</a>
          </label>
          {errors.acceptTerms && (
            <span className="text-red-500 text-sm font-medium">{errors.acceptTerms.message}</span>
          )}
        </div>

        <div className="mt-4">
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

        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes una cuenta?{' '}
            <a href="/auth/login" className="text-amber-800 font-semibold transition-colors duration-300 hover:text-amber-700 hover:underline">
              Iniciar Sesión
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 