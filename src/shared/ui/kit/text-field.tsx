'use client';

import type { InputHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils/cn';

const textFieldVariants = cva(
  'flex w-full rounded-lg cursor-pointer border px-4 text-sm text-gray-800 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-white border-gray-300',
        secondary: 'bg-gray-100 border-gray-200',
      },
      intent: {
        primary: '',
        danger:
          'border-red-500 text-red-600 placeholder:text-red-400 focus:ring-red-500',
        success:
          'border-green-500 text-green-600 placeholder:text-green-400 focus:ring-green-500',
      },
      size: {
        sm: 'h-10 px-3 text-sm',
        md: 'h-12 px-4 text-base',
        lg: 'h-14 px-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      intent: 'primary',
      size: 'md',
    },
  },
);

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;

export const TextField = ({
  className,
  label,
  hint,
  variant,
  intent,
  size,
  ...props
}: {
  label?: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement> &
  TextFieldVariants) => {
  return (
    <label className="relative flex w-full flex-col gap-1">
      {label && <span className="text-sm text-gray-600">{label}</span>}
      <input
        className={cn(textFieldVariants({ variant, intent, size }), className)}
        {...props}
      />
      {hint && (
        <span className="absolute -bottom-4 left-0 text-xs text-red-500">
          {hint}
        </span>
      )}
    </label>
  );
};
