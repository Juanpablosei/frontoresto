import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UnifiedDashboard from './pages/UnifiedDashboard';
import RestaurantManagement from './pages/RestaurantManagement';
import CreateRestaurant from './pages/CreateRestaurant';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ThemeProvider from './components/theme/ThemeProvider';

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <ThemeProvider>
      <Router>
        <div className="text-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Rutas protegidas */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRoles={['ADMIN', 'CLIENT_OWNER']}>
                  <UnifiedDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/restaurants/:id" 
              element={
                <ProtectedRoute requiredRoles={['ADMIN', 'CLIENT_OWNER']}>
                  <RestaurantManagement />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/create-restaurant" 
              element={
                <ProtectedRoute requiredRoles={['CLIENT_OWNER']}>
                  <CreateRestaurant />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirecciones */}
            <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
            <Route path="/restaurants" element={<Navigate to="/dashboard" replace />} />
            
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
