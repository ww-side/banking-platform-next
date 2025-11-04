'use client';

import { Skeleton } from '@/shared/ui/kit/skeleton';

export const LoadingForm = () => {
  return (
    <section className="flex w-[400px] flex-col gap-4">
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="ml-auto w-1/2" />
    </section>
  );
};
