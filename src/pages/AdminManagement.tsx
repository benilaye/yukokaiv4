import React, { useState } from 'react';
import { Users, UserPlus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AdminUser, getAuthorizedAdmins, addAdmin, removeAdmin } from '../utils/adminService';

export const AdminManagement: React.FC = () => {
  const { user } = useAuth();
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [error, setError] = useState('');
  const admins = getAuthorizedAdmins();

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail || !newAdminName) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const newAdmin: AdminUser = {
      email: newAdminEmail.toLowerCase(),
      name: newAdminName,
      addedBy: user?.email,
      addedAt: new Date().toISOString(),
    };

    addAdmin(newAdmin);
    setNewAdminEmail('');
    setNewAdminName('');
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Gestion des Administrateurs</h2>
      </div>

      <form onSubmit={handleAddAdmin} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              value={newAdminName}
              onChange={(e) => setNewAdminName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Nom de l'administrateur"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="email@example.com"
            />
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="mt-4 flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter un Administrateur
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Administrateurs Actuels</h3>
        <div className="divide-y divide-gray-200">
          {admins.map((admin) => (
            <div key={admin.email} className="py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                <p className="text-sm text-gray-500">{admin.email}</p>
                {admin.addedBy && (
                  <p className="text-xs text-gray-400">
                    Ajouté par {admin.addedBy}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeAdmin(admin.email)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};