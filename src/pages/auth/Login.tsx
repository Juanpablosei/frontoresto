import React from 'react';
import { LoginForm } from '../../components/forms/auth';
import { useThemeColors } from '../../hooks/useThemeColors';

const Login: React.FC = () => {
  const { getBackgroundGradient } = useThemeColors();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-8">
      <div 
        className="fixed inset-0 -z-10"
        style={{ background: getBackgroundGradient() }}
      >
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;><defs><pattern id=&quot;grain&quot; width=&quot;100&quot; height=&quot;100&quot; patternUnits=&quot;userSpaceOnUse&quot;><circle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;1&quot; fill=&quot;rgba(255,255,255,0.1)&quot;/></pattern></defs><rect width=&quot;100&quot; height=&quot;100&quot; fill=&quot;url(%23grain)&quot;/></svg>')]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <LoginForm />
          
          {/* Mostrar credenciales de prueba */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 order-first lg:order-last">
            <h3 className="text-2xl font-bold mb-6 text-center">🔑 Credenciales de Prueba</h3>
            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">ADMIN</span>
                  <span className="font-semibold text-gray-700 text-sm">Admin del Sistema</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">📧 Email:</span>
                    <span className="text-gray-700 font-semibold font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">admin@restaurant.com</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">🔒 Password:</span>
                    <span className="text-gray-700 font-semibold font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">admin123</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">CLIENT_OWNER</span>
                  <span className="font-semibold text-gray-700 text-sm">María González</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">📧 Email:</span>
                    <span className="text-gray-700 font-semibold font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">maria@buensabor.com</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">🔒 Password:</span>
                    <span className="text-gray-700 font-semibold font-mono bg-gray-50 px-2 py-1 rounded border border-gray-200">maria123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
