import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/forms/auth';
import { RegisterFormData } from '../../components/forms/auth';
import './Register.css';

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
    <div className="register-page">
      <div className="register-page__background">
        <div className="register-page__overlay"></div>
      </div>
      
      <div className="register-page__content">
        <div className="register-page__container">
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