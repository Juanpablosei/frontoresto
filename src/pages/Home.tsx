import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/buttons';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Redirigir automáticamente si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleIngresar = () => {
    navigate('/auth/login');
  };

  return (
    <div className="home-page">
      <div className="home-background">
        <div className="home-overlay"></div>
      </div>
      
      <div className="home-content">
        <header className="home-header">
          <div className="header-content">
            <div className="logo-section">
              <h1 className="logo">🍽️ RestoManager</h1>
              <p className="logo-subtitle">Sistema de Gestión de Restaurantes</p>
            </div>
            <div className="header-actions">
              <Button
                variant="primary"
                size="medium"
                onClick={handleIngresar}
              >
                🚀 Ingresar
              </Button>
            </div>
          </div>
        </header>

        <main className="home-main">
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                Gestiona tu restaurante de manera inteligente
              </h1>
              <p className="hero-description">
                Sistema completo para la administración de restaurantes. 
                Control de mesas, productos, menús, empleados y estadísticas en tiempo real.
              </p>
              <div className="hero-actions">
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleIngresar}
                  fullWidth
                >
                  🚀 Comenzar Ahora
                </Button>
              </div>
            </div>
          </div>

          <div className="features-section">
            <h2 className="features-title">¿Por qué elegir RestoManager?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Estadísticas en Tiempo Real</h3>
                <p>Monitorea el rendimiento de tu restaurante con datos actualizados al momento.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3>Gestión de Empleados</h3>
                <p>Administra tu equipo de trabajo con roles y permisos específicos.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🍽️</div>
                <h3>Control de Menús</h3>
                <p>Gestiona tus productos y menús de manera eficiente y organizada.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Interfaz Moderna</h3>
                <p>Diseño intuitivo y responsive para una experiencia de usuario excepcional.</p>
              </div>
            </div>
          </div>
        </main>

        <footer className="home-footer">
          <div className="footer-content">
            <p>&copy; 2024 RestoManager. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
