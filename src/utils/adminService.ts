import { STORAGE_KEYS } from './storage';

export interface AdminUser {
  email: string;
  name: string;
  addedBy?: string;
  addedAt: string;
}

export const getAuthorizedAdmins = (): AdminUser[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMINS) || '[]');
};

export const addAdmin = (admin: AdminUser) => {
  const admins = getAuthorizedAdmins();
  admins.push(admin);
  localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(admins));
};

export const removeAdmin = (email: string) => {
  const admins = getAuthorizedAdmins();
  const filteredAdmins = admins.filter(admin => admin.email !== email);
  localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(filteredAdmins));
};

export const isAuthorizedAdmin = (email: string): boolean => {
  const admins = getAuthorizedAdmins();
  return admins.some(admin => admin.email === email);
};