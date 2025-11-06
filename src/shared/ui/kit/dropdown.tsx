'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@/shared/lib/utils/cn';

export const DropdownMenu = ({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root {...props} />
);

export const DropdownMenuPortal = ({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) => (
  <DropdownMenuPrimitive.Portal {...props} />
);

export const DropdownMenuTrigger = ({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => (
  <DropdownMenuPrimitive.Trigger
    className="rounded-md bg-gray-100 px-3 py-2 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none"
    {...props}
  />
);

export const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] rounded-md border border-gray-300 bg-white p-1 text-black shadow-lg',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      'relative flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50',
      inset && 'pl-8',
      variant === 'destructive' &&
        'text-red-600 hover:bg-red-100 focus:bg-red-100',
      className,
    )}
    {...props}
  />
);
