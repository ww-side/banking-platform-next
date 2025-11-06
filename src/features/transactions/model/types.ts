import type { User } from '@/core/user/model/types';

export type Transaction = {
  data: TransactionData[];
  meta: Meta;
};

export type TransactionData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  type: 'transfer' | 'exchange';
  description: string;
  totalAmount: string;
  currency: 'USD' | 'EUR';
};

type Meta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
