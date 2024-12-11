import React from 'react';
import { useMemberContext } from '../context/MemberContext';
import { MemberCard } from './MemberCard';
import { Users } from 'lucide-react';

export const MemberList: React.FC = () => {
  const { members, payments } = useMemberContext();

  const getMemberLatestPayment = (memberId: string) => {
    const memberPayments = payments
      .filter(payment => payment.memberId === memberId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return memberPayments[0];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Membres</h2>
      </div>
      <div className="grid gap-6">
        {members.map(member => (
          <MemberCard
            key={member.id}
            member={member}
            latestPayment={getMemberLatestPayment(member.id)}
          />
        ))}
        {members.length === 0 && (
          <p className="text-gray-500 text-center py-4">Aucun membre ajouté</p>
        )}
      </div>
    </div>
  );
};