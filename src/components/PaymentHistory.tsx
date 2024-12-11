import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Payment } from '../types';
import { CheckCircle, XCircle, Edit2 } from 'lucide-react';
import { useMemberContext } from '../context/MemberContext';
import { EditPaymentModal } from './EditPaymentModal';
import { formatCurrency } from '../utils/formatCurrency';

export const PaymentHistory: React.FC = () => {
  const { payments, members } = useMemberContext();
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  const getMemberName = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    return member ? `${member.firstName} ${member.lastName}` : 'Membre Inconnu';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Historique des Paiements</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Membre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mois
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getMemberName(payment.memberId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(payment.date, 'PP', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="flex items-center">
                    {payment.status === 'paid' ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-green-800">Payé</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-red-800">En attente</span>
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setEditingPayment(payment)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Aucun paiement enregistré
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editingPayment && (
        <EditPaymentModal
          payment={editingPayment}
          onClose={() => setEditingPayment(null)}
        />
      )}
    </div>
  );
};