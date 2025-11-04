import { getUsername } from '@/core/user/api/get-username';
import { UserGreeting } from '@/core/user/ui/user-greeting';

import { getAccounts } from '@/features/accounts/api/get-accounts';
import { AccountsList } from '@/features/accounts/ui/accounts-list';

export default async function Home() {
  const [accounts, username] = await Promise.all([
    getAccounts(),
    getUsername(),
  ]);

  if ('error' in accounts) {
    const errMsg = Array.isArray(accounts.message)
      ? accounts.message.join(', ')
      : accounts.message;

    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
        <p className="mb-2 font-semibold">
          Ooops, the application is currently not available. Please try again
          later.
        </p>
        <p className="text-sm text-red-700">More details: {errMsg}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-5 p-4">
      <UserGreeting username={username} />
      <AccountsList values={accounts} />
    </main>
  );
}
