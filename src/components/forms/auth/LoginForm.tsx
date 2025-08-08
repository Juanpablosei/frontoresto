import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../buttons';
import { LoginFormData, LoginFormProps } from './types';

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-amber-800 mb-2">🍽️ Iniciar Sesión</h1>
        <p className="text-gray-600 text-sm">Accede a tu cuenta para gestionar tu restaurante</p>
      </div>

      {error && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl mb-6 text-center font-medium">
          <span>⚠️ {error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-amber-800 text-sm">📧 Correo Electrónico</label>
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
            className={`p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-800 focus:shadow-lg focus:shadow-amber-800/10 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-medium">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-amber-800 text-sm">🔒 Contraseña</label>
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
            className={`p-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-amber-800 focus:shadow-lg focus:shadow-amber-800/10 ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-medium">{errors.password.message}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer font-medium text-gray-600 text-sm">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="hidden"
            />
            <span className="w-5 h-5 border-2 border-gray-200 rounded relative transition-all duration-300 peer-checked:bg-amber-800 peer-checked:border-amber-800">
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-0 peer-checked:opacity-100">✓</span>
            </span>
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

      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-gray-600 mb-2 text-sm">¿No tienes una cuenta?</p>
        <a href="/auth/registro" className="text-amber-800 font-semibold text-sm transition-colors duration-300 hover:text-amber-700 hover:underline">
          Crear Cuenta
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
