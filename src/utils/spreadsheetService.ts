import { Member, Payment } from '../types';
import { format } from 'date-fns';

const SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

export const exportToSpreadsheet = async (
  members: Member[],
  payments: Payment[],
  accessToken: string
) => {
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID;

  try {
    // Prepare the values for both sheets
    const memberValues = [
      ['ID', 'Prénom', 'Nom', 'Téléphone', 'Adresse', 'Date d\'inscription'],
      ...members.map(member => [
        member.id,
        member.firstName,
        member.lastName,
        member.phone,
        member.address,
        format(new Date(member.joinDate), 'dd/MM/yyyy')
      ])
    ];

    const paymentValues = [
      ['ID', 'ID Membre', 'Montant', 'Date', 'Mois', 'Statut'],
      ...payments.map(payment => [
        payment.id,
        payment.memberId,
        payment.amount,
        format(new Date(payment.date), 'dd/MM/yyyy'),
        payment.month,
        payment.status
      ])
    ];

    // Update both sheets using the batch update endpoint
    const response = await fetch(
      `${SHEETS_API_URL}/${spreadsheetId}/values:batchUpdate`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valueInputOption: 'USER_ENTERED',
          data: [
            {
              range: 'Membres!A1',
              values: memberValues
            },
            {
              range: 'Paiements!A1',
              values: paymentValues
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update spreadsheet');
    }

    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
  } catch (error) {
    console.error('Error exporting to spreadsheet:', error);
    throw error;
  }
};