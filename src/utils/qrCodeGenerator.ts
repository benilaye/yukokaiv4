import { Member, Payment } from '../types';

export const generateQRCodeData = (memberId: string): string => {
  // Generate a unique, verifiable URL for the member's payment status
  const baseUrl = window.location.origin;
  const qrData = `${baseUrl}/member/${memberId}`;
  return qrData;
};

export const generateMemberStatusUrl = (member: Member, latestPayment?: Payment): string => {
  const baseUrl = window.location.origin;
  // Create a unique, encoded identifier that includes member info and payment status
  const data = {
    id: member.id,
    name: `${member.firstName} ${member.lastName}`,
    status: latestPayment?.status || 'pending',
    lastPayment: latestPayment ? {
      amount: latestPayment.amount,
      date: new Date(latestPayment.date).toISOString(),
      month: latestPayment.month
    } : null
  };
  
  // Encode the data to be included in the QR code
  const encodedData = btoa(JSON.stringify(data));
  return `${baseUrl}/verify/${encodedData}`;
};