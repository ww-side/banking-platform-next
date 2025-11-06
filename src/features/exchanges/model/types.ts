import type { User } from '@/core/user/model/types';

export type Exchange = {
  transaction: Transaction;
  rate: number;
  fromAccount: FromAccount;
  toAccount: ToAccount;
};

export type Transaction = {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  type: string;
  description: string;
  totalAmount: string;
  currency: 'USD' | 'EUR';
};

export type FromAccount = {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  currency: 'USD' | 'EUR';
  balance: string;
};

export type ToAccount = {
  id: string;
  createdAt: string;
  updatedAt: string;
  currency: 'USD' | 'EUR';
  balance: string;
};
