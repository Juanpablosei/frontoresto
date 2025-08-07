import React from 'react';
import { AdminPanel } from '../components/admin';

const Admin: React.FC = () => {
  const handleLogout = () => {
    console.log('Admin logged out');
  };

  return <AdminPanel onLogout={handleLogout} />;
};

export default Admin;
