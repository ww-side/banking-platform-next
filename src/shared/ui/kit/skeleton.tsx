import { cn } from '@/shared/lib/utils/cn';

export const Skeleton = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    data-slot="skeleton"
    className={cn(
      'h-10 w-[100px] animate-pulse rounded-md bg-gray-300',
      className,
    )}
    {...props}
  />
);
