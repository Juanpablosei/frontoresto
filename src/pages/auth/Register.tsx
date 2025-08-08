import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/forms/auth';
import { RegisterFormData } from '../../components/forms/auth';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('¡Cuenta creada exitosamente! Por favor, inicia sesión.');
      navigate('/auth/login');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 -z-10">
        <div className="absolute inset-0 bg-black/30 -z-10"></div>
      </div>
      
      <div className="w-full max-w-6xl flex items-center justify-center z-10">
        <div className="w-full flex justify-center items-center">
          <RegisterForm
            onSubmit={handleRegister}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Register; 