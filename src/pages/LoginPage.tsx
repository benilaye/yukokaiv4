import React from 'react';
import { Navigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <Dumbbell className="h-12 w-12 text-indigo-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Club de Karaté Yukokai
          </h1>
          <p className="mt-2 text-gray-600 text-center">
            Système de Gestion des Paiements
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};