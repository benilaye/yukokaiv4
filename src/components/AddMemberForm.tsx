import React, { useState } from 'react';
import { useMemberContext } from '../context/MemberContext';
import { UserPlus } from 'lucide-react';

export const AddMemberForm: React.FC = () => {
  const { addMember, addPayment } = useMemberContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    imageUrl: '',
    amount: '',
    month: '',
    paymentDate: '',
    paymentStatus: 'pending' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const joinDate = new Date(formData.paymentDate || new Date());
    const member = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      address: formData.address,
      imageUrl: formData.imageUrl,
      joinDate,
    };
    
    const newMemberId = Date.now().toString();
    addMember({ ...member, id: newMemberId, qrCode: `https://example.com/qr/${newMemberId}` });

    if (formData.amount) {
      addPayment({
        memberId: newMemberId,
        amount: Number(formData.amount),
        date: joinDate,
        month: formData.month,
        status: formData.paymentStatus,
      });
    }

    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      imageUrl: '',
      amount: '',
      month: '',
      paymentDate: '',
      paymentStatus: 'pending',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <UserPlus className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Ajouter un Nouveau Membre</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Informations du Membre</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL de la Photo</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Paiement Initial</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date d'Inscription</label>
            <input
              type="date"
              value={formData.paymentDate}
              onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Montant (FCFA)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              min="0"
              step="500"
              placeholder="15000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mois (MM/AAAA)</label>
            <input
              type="text"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              pattern="\d{2}/\d{4}"
              placeholder="MM/AAAA"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Statut du Paiement</label>
            <select
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as 'paid' | 'pending' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="pending">En attente</option>
              <option value="paid">Payé</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Ajouter le Membre avec Paiement
        </button>
      </div>
    </form>
  );
};