'use client';

import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils/cn';

const btnVariants = cva(
  'inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out gap-2.5',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md',
        secondary:
          'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-500 shadow-sm',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md',
        outline:
          'border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-300',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariants = VariantProps<typeof btnVariants>;

export const Button = ({
  children,
  className,
  onClick,
  disabled,
  size,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  as = 'button',
}: {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  as?: 'button' | 'span';
} & ButtonVariants) => {
  const Tag = as;

  return (
    <Tag
      className={cn(
        btnVariants({ variant, size }),
        fullWidth ? 'w-full justify-center' : 'w-max',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </Tag>
  );
};
