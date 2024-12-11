import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberList } from '../components/MemberList';
import { PaymentHistory } from '../components/PaymentHistory';
import { AddMemberForm } from '../components/AddMemberForm';
import { ExportButton } from '../components/ExportButton';
import { AdminManagement } from './AdminManagement';
import { useAuth } from '../context/AuthContext';
import { Dumbbell, LogOut, Settings } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Dumbbell className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Club de Karaté Yukokai
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <ExportButton />
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <Settings className="h-5 w-5" />
                <span className="ml-2">Administration</span>
              </button>
              <div className="flex items-center">
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="ml-2 text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {showAdminPanel ? (
            <AdminManagement />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AddMemberForm />
                <MemberList />
              </div>
              <div className="space-y-6">
                <PaymentHistory />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};