export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  joinDate: Date;
  qrCode: string;
  imageUrl?: string;
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  date: Date;
  month: string;
  status: 'paid' | 'pending';
}