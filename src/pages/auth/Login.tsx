import React from 'react';
import { LoginForm } from '../../components/forms/auth';
import { AuthBackground, TestCredentials } from '../../components/auth';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-8">
      <AuthBackground />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <LoginForm />
          <TestCredentials />
        </div>
      </div>
    </div>
  );
};

export default Login;
