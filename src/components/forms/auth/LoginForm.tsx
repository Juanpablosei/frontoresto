import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { Button } from '../../buttons';
import { useThemeColors } from '../../../hooks/useThemeColors';
import { mockUsers } from '../../../mock/users';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { 
    getCardBackground, 
    getCardBorder, 
    getTextColor, 
    getInputBackground, 
    getInputBorder, 
    getInputFocusBorder,
    getDangerColor
  } = useThemeColors();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simular delay de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Buscar usuario en mock data
      const user = mockUsers.find(u => 
        u.email === email && u.password === password
      );

      if (user) {
        // Usar el store de Zustand para hacer login
        login(user);
        
        // Redirigir al dashboard unificado para todos los usuarios
        navigate('/dashboard');
      } else {
        setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl backdrop-blur-lg border"
      style={{
        backgroundColor: getCardBackground(),
        borderColor: getCardBorder(),
      }}
    >
      <div className="text-center mb-8">
        <h2 
          className="text-3xl font-bold mb-2"
          style={{ color: getTextColor(900) }}
        >
          🚀 Bienvenido
        </h2>
        <p 
          className="text-lg"
          style={{ color: getTextColor(600) }}
        >
          Inicia sesión en tu cuenta
        </p>
      </div>

      {error && (
        <div 
          className="mb-6 p-4 rounded-lg text-white text-center font-medium"
          style={{ backgroundColor: getDangerColor() }}
        >
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium mb-2"
            style={{ color: getTextColor(700) }}
          >
            📧 Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: getInputBackground(),
              borderColor: getInputBorder(),
              color: getTextColor(900),
            }}
            onFocus={(e) => {
              e.target.style.borderColor = getInputFocusBorder();
            }}
            onBlur={(e) => {
              e.target.style.borderColor = getInputBorder();
            }}
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium mb-2"
            style={{ color: getTextColor(700) }}
          >
            🔒 Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: getInputBackground(),
              borderColor: getInputBorder(),
              color: getTextColor(900),
            }}
            onFocus={(e) => {
              e.target.style.borderColor = getInputFocusBorder();
            }}
            onBlur={(e) => {
              e.target.style.borderColor = getInputBorder();
            }}
            placeholder="••••••••"
          />
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

      <div className="mt-6 text-center">
        <p 
          className="text-sm"
          style={{ color: getTextColor(500) }}
        >
          ¿No tienes cuenta?{' '}
          <a 
            href="/auth/register" 
            className="font-semibold hover:underline transition-colors duration-200"
            style={{ color: getTextColor(700) }}
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
