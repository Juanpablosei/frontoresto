import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Register, Login } from './pages/auth';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
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
            path="/admin" 
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/restaurants" 
            element={
              <ProtectedRoute requiredRoles={['CLIENT_OWNER']}>
                <Restaurants />
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
