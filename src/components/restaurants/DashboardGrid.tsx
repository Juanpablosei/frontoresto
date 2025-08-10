import React from 'react';

interface DashboardGridProps {
  restaurantsCount: number;
  employeesCount: number;
  onShowRestaurants: () => void;
  onShowAllEmployees: () => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  restaurantsCount,
  employeesCount,
  onShowRestaurants,
  onShowAllEmployees
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">📊 Resumen General</h2>
        <p className="text-gray-600">Gestiona todos los aspectos de tu negocio</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer group"
          onClick={onShowRestaurants}
        >
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🏪</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{restaurantsCount}</div>
                <div className="text-sm opacity-90">Restaurantes</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mis Restaurantes</h3>
            <p className="text-gray-600 text-sm mb-4">Gestiona la información de tus restaurantes</p>
            <div className="flex items-center text-amber-600 font-medium text-sm">
              <span>Ver detalles</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>

        <div 
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer group"
          onClick={onShowAllEmployees}
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{employeesCount}</div>
                <div className="text-sm opacity-90">Empleados</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Empleados</h3>
            <p className="text-gray-600 text-sm mb-4">Administra tu equipo de trabajo</p>
            <div className="flex items-center text-blue-600 font-medium text-sm">
              <span>Ver detalles</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🍽️</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">45</div>
                <div className="text-sm opacity-90">Productos</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Menús</h3>
            <p className="text-gray-600 text-sm mb-4">Gestiona productos y menús</p>
            <div className="flex items-center text-green-600 font-medium text-sm">
              <span>Próximamente</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">📊</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">$2,450</div>
                <div className="text-sm opacity-90">Ventas Hoy</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Estadísticas</h3>
            <p className="text-gray-600 text-sm mb-4">Monitorea el rendimiento</p>
            <div className="flex items-center text-purple-600 font-medium text-sm">
              <span>Próximamente</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">📋</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm opacity-90">Pendientes</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Órdenes</h3>
            <p className="text-gray-600 text-sm mb-4">Gestiona pedidos y reservas</p>
            <div className="flex items-center text-red-600 font-medium text-sm">
              <span>Próximamente</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">⚙️</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">-</div>
                <div className="text-sm opacity-90">Ajustes</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Configuración</h3>
            <p className="text-gray-600 text-sm mb-4">Ajusta preferencias del sistema</p>
            <div className="flex items-center text-gray-600 font-medium text-sm">
              <span>Próximamente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
