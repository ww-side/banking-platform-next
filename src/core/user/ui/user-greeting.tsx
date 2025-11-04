'use client';

import { HandIcon } from '@/shared/ui/icons/hand';

export const UserGreeting = ({ username }: { username: string }) => {
  return (
    <section className="flex w-max items-center gap-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-900">
        Welcome back, {username}
      </h1>
      <HandIcon />
    </section>
  );
};
