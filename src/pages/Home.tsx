import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/buttons';
import ColorPaletteSelector from '../components/theme/ColorPaletteSelector';
import { useThemeColors } from '../hooks/useThemeColors';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { getBackgroundGradient } = useThemeColors();

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
      <div 
        className="fixed inset-0 -z-10"
        style={{ background: getBackgroundGradient() }}
      >
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;><defs><pattern id=&quot;grain&quot; width=&quot;100&quot; height=&quot;100&quot; patternUnits=&quot;userSpaceOnUse&quot;><circle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;1&quot; fill=&quot;rgba(255,255,255,0.1)&quot;/></pattern></defs><rect width=&quot;100&quot; height=&quot;100&quot; fill=&quot;url(%23grain)&quot;/></svg>')]"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-6 lg:p-8 bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-white shadow-lg">🍽️ RestoManager</h1>
              <p className="text-sm text-white/80 font-light">Sistema de Gestión de Restaurantes</p>
            </div>
            <div className="flex gap-4">
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

        <main className="flex-1 flex flex-col px-8 lg:px-8 py-16 lg:py-16 max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 lg:mb-16 py-16 lg:py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight shadow-lg">
                Gestiona tu restaurante de manera inteligente
              </h1>
              <p className="text-lg lg:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
                Sistema completo para la administración de restaurantes. 
                Control de mesas, productos, menús, empleados y estadísticas en tiempo real.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
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

          {/* Selector de Paleta de Colores */}
          <div className="mb-16">
            <ColorPaletteSelector />
          </div>

          <div className="py-16 lg:py-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white text-center mb-12 shadow-lg">¿Por qué elegir RestoManager?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                <div className="text-5xl mb-4 block">📊</div>
                <h3 className="text-xl font-semibold text-white mb-4 shadow-md">Estadísticas en Tiempo Real</h3>
                <p className="text-white/80 leading-relaxed">Monitorea el rendimiento de tu restaurante con datos actualizados al momento.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                <div className="text-5xl mb-4 block">👥</div>
                <h3 className="text-xl font-semibold text-white mb-4 shadow-md">Gestión de Empleados</h3>
                <p className="text-white/80 leading-relaxed">Administra tu equipo de trabajo con roles y permisos específicos.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                <div className="text-5xl mb-4 block">🍽️</div>
                <h3 className="text-xl font-semibold text-white mb-4 shadow-md">Control de Menús</h3>
                <p className="text-white/80 leading-relaxed">Gestiona tus productos y menús de manera eficiente y organizada.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                <div className="text-5xl mb-4 block">📱</div>
                <h3 className="text-xl font-semibold text-white mb-4 shadow-md">Interfaz Moderna</h3>
                <p className="text-white/80 leading-relaxed">Diseño intuitivo y responsive para una experiencia de usuario excepcional.</p>
              </div>
            </div>
          </div>
        </main>

        <footer className="p-8 bg-black/20 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/70 text-sm">&copy; 2024 RestoManager. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
