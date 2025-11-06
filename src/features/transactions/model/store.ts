import { create } from 'zustand';

import type { TransactionData } from './types';

export const useTransactionsDataStore = create<{
  transactions: TransactionData[];
  setTransactions: (transactions: TransactionData[]) => void;
  addTransaction: (transaction: TransactionData) => void;
}>(set => ({
  transactions: [],
  setTransactions: transactions => set({ transactions }),
  addTransaction: transaction =>
    set(state => ({ transactions: [...state.transactions, transaction] })),
}));
