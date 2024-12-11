import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member, Payment } from '../types';
import { generateQRCodeData } from '../utils/qrCodeGenerator';
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '../utils/storage';

interface MemberContextType {
  members: Member[];
  payments: Payment[];
  addMember: (member: Omit<Member, 'id' | 'qrCode'>) => void;
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  updatePayment: (paymentId: string, updates: Partial<Payment>) => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

const parseDates = (data: any[]): any[] => {
  return data.map(item => ({
    ...item,
    date: item.date ? new Date(item.date) : undefined,
    joinDate: item.joinDate ? new Date(item.joinDate) : undefined
  }));
};

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = getStorageItem<Member[]>(STORAGE_KEYS.MEMBERS, []);
    return parseDates(savedMembers);
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const savedPayments = getStorageItem<Payment[]>(STORAGE_KEYS.PAYMENTS, []);
    return parseDates(savedPayments);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.MEMBERS, members);
  }, [members]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
  }, [payments]);

  const addMember = (memberData: Omit<Member, 'id' | 'qrCode'>) => {
    const id = Date.now().toString();
    const newMember: Member = {
      ...memberData,
      id,
      qrCode: generateQRCodeData(id),
    };
    setMembers(prevMembers => [...prevMembers, newMember]);
  };

  const addPayment = (paymentData: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString(),
    };
    setPayments(prevPayments => [...prevPayments, newPayment]);
  };

  const updatePayment = (paymentId: string, updates: Partial<Payment>) => {
    setPayments(prevPayments => 
      prevPayments.map(payment => 
        payment.id === paymentId ? { ...payment, ...updates } : payment
      )
    );
  };

  return (
    <MemberContext.Provider value={{ members, payments, addMember, addPayment, updatePayment }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMemberContext must be used within a MemberProvider');
  }
  return context;
};