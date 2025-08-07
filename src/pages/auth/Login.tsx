import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/forms/auth';
import { LoginFormData } from '../../components/forms/auth';
import { mockUsers } from '../../mock/users';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simular delay de login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Buscar usuario en mock data
      const user = mockUsers.find(u => 
        u.email === data.email && u.password === data.password
      );

      if (user) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem('authToken', 'mock-token-' + user.id);
        localStorage.setItem('userData', JSON.stringify(user));
        
        // Redirigir según el rol del usuario
        if (user.role === 'ADMIN') {
          navigate('/admin');
        } else if (user.role === 'CLIENT_OWNER') {
          navigate('/restaurants');
        } else {
          // Para otros roles, redirigir a una página genérica
          navigate('/dashboard');
        }
      } else {
        setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__background">
        <div className="login-page__overlay"></div>
      </div>
      
      <div className="login-page__content">
        <div className="login-page__container">
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />
          
          {/* Mostrar credenciales de prueba */}
          <div className="mock-credentials">
            <h3>🔑 Credenciales de Prueba</h3>
            <div className="credentials-grid">
              {mockUsers.map((user) => (
                <div key={user.id} className="credential-card">
                  <div className="credential-header">
                    <span className="role-badge">{user.role}</span>
                    <span className="user-name">{user.name}</span>
                  </div>
                  <div className="credential-details">
                    <div className="credential-item">
                      <span className="label">📧 Email:</span>
                      <span className="value">{user.email}</span>
                    </div>
                    <div className="credential-item">
                      <span className="label">🔒 Password:</span>
                      <span className="value">{user.password}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
