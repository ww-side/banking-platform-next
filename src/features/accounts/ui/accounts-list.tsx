'use client';

import { DollarIcon } from '@/shared/ui/icons/dollar';
import { EuroIcon } from '@/shared/ui/icons/euro';

import type { Account } from '../model/types';

const icons: Record<string, React.ReactNode> = {
  USD: <DollarIcon />,
  EUR: <EuroIcon />,
};

export const AccountsList = ({ values }: { values: Account[] }) => {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {values.map(account => (
        <AccountItem key={account.id} account={account} />
      ))}
    </ul>
  );
};

const AccountItem = ({ account }: { account: Account }) => {
  return (
    <li className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <p className="text-sm text-gray-500">Currency</p>
      <div className="flex items-center gap-1">
        {icons[account.currency] || null}
        <p className="text-lg font-semibold text-gray-900">
          {account.currency}
        </p>
      </div>
      <p className="mt-2 text-sm text-gray-500">Balance</p>
      <p className="text-xl font-bold text-gray-900">{account.balance}</p>
    </li>
  );
};
