import { getUsername } from '@/core/user/api/get-username';
import { getUsers } from '@/core/user/api/get-users';
import { UserGreeting } from '@/core/user/ui/user-greeting';

import { getAccounts } from '@/features/accounts/api/get-accounts';
import { AccountsList } from '@/features/accounts/ui/accounts-list';
import { ExchangeForm } from '@/features/exchanges/ui/exchange-form';
import { getTransactions } from '@/features/transactions/api/get-transactions';
import { TransactionsList } from '@/features/transactions/ui/transactions-list';
import { TransferForm } from '@/features/transfers/ui/transfer-form';

import { ErrorHandler } from '@/shared/ui/components/error-handler';

export default async function Home() {
  const [accounts, username, transactions, users] = await Promise.all([
    getAccounts(),
    getUsername(),
    getTransactions({ params: { limit: 5 } }),
    getUsers(),
  ]);

  return (
    <ErrorHandler data={[accounts, transactions, users] as const}>
      {(safeAccounts, safeTransactions, safeUsers) => (
        <main className="flex flex-col gap-5 p-4">
          <UserGreeting username={username} />
          <AccountsList values={safeAccounts} />
          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Last 5 transactions:</h2>
            <TransactionsList values={safeTransactions} />
          </section>
          <section className="flex gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Transfer Form</h2>
              <TransferForm users={safeUsers} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Exchange Form</h2>
              <ExchangeForm />
            </div>
          </section>
        </main>
      )}
    </ErrorHandler>
  );
}
