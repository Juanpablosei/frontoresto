import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import ColorPaletteSelector from '../components/theme/ColorPaletteSelector';
import { 
  Header, 
  Hero, 
  Features, 
  Footer, 
  Background 
} from '../components/home';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Solo redirigir si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleIngresar = () => {
    navigate('/auth/login');
  };

  // Si el usuario está autenticado, no mostrar nada (será redirigido)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Background />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header onEnter={handleIngresar} />

        <main className="flex-1 flex flex-col px-8 lg:px-8 py-16 lg:py-16 max-w-6xl mx-auto w-full">
          <Hero onStartNow={handleIngresar} />

          {/* Selector de Paleta de Colores */}
          <div className="mb-16">
            <ColorPaletteSelector />
          </div>

          <Features />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
