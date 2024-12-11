import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Member, Payment } from '../types';
import { Phone, MapPin, Calendar } from 'lucide-react';
import { QRCodeDisplay } from './QRCodeDisplay';
import { MonthlyPaymentButton } from './MonthlyPaymentButton';

interface MemberCardProps {
  member: Member;
  latestPayment?: Payment;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, latestPayment }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
      <div className="flex justify-between items-start">
        <div>
          {member.imageUrl && (
            <div className="mb-4">
              <img
                src={member.imageUrl}
                alt={`${member.firstName} ${member.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600"
              />
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-800">
            {member.firstName} {member.lastName}
          </h2>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>{member.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{member.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Inscrit le: {format(new Date(member.joinDate), 'PP', { locale: fr })}</span>
            </div>
            <div className="mt-4">
              <MonthlyPaymentButton member={member} />
            </div>
          </div>
        </div>
        <QRCodeDisplay member={member} latestPayment={latestPayment} />
      </div>
    </div>
  );
};