import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
          onClick={() => navigate('/create-restaurant')}
        >
          <span className="text-2xl mb-2">➕</span>
          <span className="text-sm font-medium">Agregar Restaurante</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md">
          <span className="text-2xl mb-2">👥</span>
          <span className="text-sm font-medium">Contratar Empleado</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md">
          <span className="text-2xl mb-2">🍽️</span>
          <span className="text-sm font-medium">Crear Menú</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md">
          <span className="text-2xl mb-2">📊</span>
          <span className="text-sm font-medium">Ver Reportes</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
