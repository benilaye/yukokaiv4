import { Member, Payment } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const createCSV = (data: string[][]): string => {
  return data.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
};

const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToCSV = async (members: Member[], payments: Payment[]) => {
  // Export members
  const memberHeaders = ['ID', 'Prénom', 'Nom', 'Téléphone', 'Adresse', 'Date d\'inscription'];
  const memberRows = members.map(member => [
    member.id,
    member.firstName,
    member.lastName,
    member.phone,
    member.address,
    format(new Date(member.joinDate), 'dd/MM/yyyy', { locale: fr })
  ]);
  const memberCSV = createCSV([memberHeaders, ...memberRows]);
  downloadCSV(memberCSV, `membres_${format(new Date(), 'dd-MM-yyyy')}.csv`);

  // Export payments
  const paymentHeaders = ['ID', 'ID Membre', 'Montant', 'Date', 'Mois', 'Statut'];
  const paymentRows = payments.map(payment => [
    payment.id,
    payment.memberId,
    payment.amount.toString(),
    format(new Date(payment.date), 'dd/MM/yyyy', { locale: fr }),
    payment.month,
    payment.status === 'paid' ? 'Payé' : 'En attente'
  ]);
  const paymentCSV = createCSV([paymentHeaders, ...paymentRows]);
  downloadCSV(paymentCSV, `paiements_${format(new Date(), 'dd-MM-yyyy')}.csv`);
};