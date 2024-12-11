import React, { useState } from 'react';
import { Payment } from '../types';
import { useMemberContext } from '../context/MemberContext';

interface EditPaymentModalProps {
  payment: Payment;
  onClose: () => void;
}

export const EditPaymentModal: React.FC<EditPaymentModalProps> = ({ payment, onClose }) => {
  const { updatePayment } = useMemberContext();
  const [formData, setFormData] = useState({
    amount: payment.amount.toString(),
    month: payment.month,
    status: payment.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePayment(payment.id, {
      amount: Number(formData.amount),
      month: formData.month,
      status: formData.status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Modifier le Paiement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Montant (FCFA)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
              step="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mois</label>
            <input
              type="text"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              pattern="\d{2}/\d{4}"
              placeholder="MM/AAAA"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
          <div className="flex justify-end space-x-2">
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
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};