import type { User } from '@/core/user/model/types';

export type Transfer = {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  type: 'transfer' | 'exchange';
  description: string;
  totalAmount: string;
  currency: 'USD' | 'EUR';
};
