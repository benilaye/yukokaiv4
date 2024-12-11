import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Member } from '../types';
import { MonthlyPaymentModal } from './MonthlyPaymentModal';

interface MonthlyPaymentButtonProps {
  member: Member;
}

export const MonthlyPaymentButton: React.FC<MonthlyPaymentButtonProps> = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <CreditCard className="w-4 h-4 mr-1" />
        <span>Paiement Mensuel</span>
      </button>
      {isModalOpen && (
        <MonthlyPaymentModal
          member={member}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};