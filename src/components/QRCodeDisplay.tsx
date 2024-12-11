import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Member, Payment } from '../types';
import { generateMemberStatusUrl } from '../utils/qrCodeGenerator';

interface QRCodeDisplayProps {
  member: Member;
  latestPayment?: Payment;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ member, latestPayment }) => {
  const qrCodeUrl = generateMemberStatusUrl(member, latestPayment);

  return (
    <div className="flex flex-col items-center">
      <QRCodeSVG 
        value={qrCodeUrl}
        size={100}
        level="H"
        includeMargin={true}
        imageSettings={{
          src: member.imageUrl || '',
          x: undefined,
          y: undefined,
          height: 24,
          width: 24,
          excavate: true,
        }}
      />
      <span className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
        latestPayment?.status === 'paid' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {latestPayment?.status === 'paid' ? 'Paid' : 'Pending'}
      </span>
    </div>
  );
};