import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Register, Login } from './pages/auth';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import CreateRestaurant from './pages/CreateRestaurant';
import RestaurantManagement from './pages/RestaurantManagement';
import UnifiedDashboard from './pages/UnifiedDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/registro" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'CLIENT_OWNER']}>
                <UnifiedDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={<Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/restaurants" 
            element={<Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/restaurants/create" 
            element={
              <ProtectedRoute requiredRoles={['CLIENT_OWNER']}>
                <CreateRestaurant />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/restaurants/:id" 
            element={
              <ProtectedRoute requiredRoles={['CLIENT_OWNER', 'ADMIN']}>
                <RestaurantManagement />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
