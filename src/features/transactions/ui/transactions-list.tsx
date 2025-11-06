'use client';

import { cn } from '@/shared/lib/utils/cn';

import { useTransactionsDataStore } from '../model/store';
import type { Transaction, TransactionData } from '../model/types';

export const TransactionsList = ({ values }: { values: Transaction }) => {
  const transactionsData = useTransactionsDataStore(
    state => state.transactions,
  );

  return (
    <ul className="flex w-[400px] flex-col gap-2">
      {values.data.length ? (
        [...transactionsData, ...values.data]
          .slice(0, 5)
          .map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
      ) : (
        <p className="text-sm text-gray-500">No transactions found</p>
      )}
    </ul>
  );
};

export const TransactionItem = ({
  transaction,
}: {
  transaction: TransactionData;
}) => {
  return (
    <li className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'h-3 w-3 rounded-full',
            transaction.type === 'transfer' ? 'bg-blue-500' : 'bg-green-500',
          )}
        ></span>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {transaction.description}
          </span>
          <span className="text-xs text-gray-500">
            {transaction.user.username} •
            {new Date(transaction.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-sm font-semibold text-gray-900">
          {transaction.totalAmount} {transaction.currency}
        </span>
        <span className="block text-xs text-gray-500">{transaction.type}</span>
      </div>
    </li>
  );
};
