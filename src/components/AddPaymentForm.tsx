import React, { useState } from 'react';
import { useMemberContext } from '../context/MemberContext';
import { CreditCard } from 'lucide-react';

export const AddPaymentForm: React.FC<{ memberId: string }> = ({ memberId }) => {
  const { addPayment } = useMemberContext();
  const [formData, setFormData] = useState({
    amount: '',
    month: '',
    status: 'pending' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPayment({
      memberId,
      amount: Number(formData.amount),
      date: new Date(),
      month: formData.month,
      status: formData.status,
    });
    setFormData({ amount: '', month: '', status: 'pending' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mt-4">
      <div className="flex items-center mb-4">
        <CreditCard className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Add Payment</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (FCFA)</label>
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
          <label className="block text-sm font-medium text-gray-700">Month (MM/YYYY)</label>
          <input
            type="text"
            value={formData.month}
            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
            pattern="\d{2}/\d{4}"
            placeholder="MM/YYYY"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'paid' | 'pending' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Payment
        </button>
      </div>
    </form>
  );
};