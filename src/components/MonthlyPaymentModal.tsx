import React, { useState } from 'react';
import { Member } from '../types';
import { useMemberContext } from '../context/MemberContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MonthlyPaymentModalProps {
  member: Member;
  onClose: () => void;
}

export const MonthlyPaymentModal: React.FC<MonthlyPaymentModalProps> = ({ member, onClose }) => {
  const { addPayment } = useMemberContext();
  const [formData, setFormData] = useState({
    amount: '15000',
    month: format(new Date(), 'MM/yyyy'),
    status: 'pending' as const,
    paymentDate: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPayment({
      memberId: member.id,
      amount: Number(formData.amount),
      date: new Date(formData.paymentDate),
      month: formData.month,
      status: formData.status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Paiement Mensuel pour {member.firstName} {member.lastName}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date du Paiement</label>
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
              min="0"
              step="500"
              required
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
            <label className="block text-sm font-medium text-gray-700">Statut</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'paid' | 'pending' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="pending">En attente</option>
              <option value="paid">Payé</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Enregistrer le Paiement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};