'use client';

import type { User } from '@/core/user/model/types';

import { useTransactionsDataStore } from '@/features/transactions/model/store';

import { useForm } from '@/shared/lib/forms';
import { notify } from '@/shared/lib/toaster';
import { Button } from '@/shared/ui/kit/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/kit/dropdown';
import { TextField } from '@/shared/ui/kit/text-field';

import { createExchange } from '../api/create-exchange';
import { createExchangeSchema } from '../model/schema';

export const ExchangeForm = () => {
  const addTransaction = useTransactionsDataStore(
    state => state.addTransaction,
  );

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: '',
      toCurrency: 'USD',
      fromCurrency: 'EUR',
    },
    validators: {
      onChange: createExchangeSchema,
    },
    onSubmit: async data => {
      const { value } = data;

      const res = await createExchange(value);

      if ('error' in res) {
        notify(
          Array.isArray(res.message) ? res.message.join(', ') : res.message,
        );
      } else {
        addTransaction({
          id: res.transaction.id,
          createdAt: res.transaction.createdAt,
          updatedAt: res.transaction.updatedAt,
          user: res.transaction.user,
          type: 'exchange',
          description: res.transaction.description,
          totalAmount: res.transaction.totalAmount,
          currency: res.transaction.currency,
        });
        notify('Exchange successful');
        reset();
      }
    },
  });

  return (
    <form
      className="flex w-[400px] flex-col gap-4 rounded-2xl bg-gray-50 p-4"
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit().catch(console.error);
      }}
    >
      <Field name="fromCurrency">
        {field => (
          <section className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">From currency</p>
            <DropdownMenu>
              <DropdownMenuTrigger>{field.state.value}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => field.handleChange('USD')}>
                  USD
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => field.handleChange('EUR')}>
                  EUR
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        )}
      </Field>
      <Field name="amount">
        {field => (
          <TextField
            name={field.name}
            label="Amount"
            placeholder="0.00"
            type="text"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => {
              const value = e.target.value;

              if (/^\d*\.?\d{0,2}$/.test(value)) {
                field.handleChange(value);
              }
            }}
            intent={field.state.meta.errors.length ? 'danger' : 'primary'}
            hint={field.state.meta.errors
              .map(error => error?.message)
              .join(', ')}
          />
        )}
      </Field>
      <Field name="toCurrency">
        {field => (
          <section className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">To currency</p>
            <DropdownMenu>
              <DropdownMenuTrigger>{field.state.value}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => field.handleChange('USD')}>
                  USD
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => field.handleChange('EUR')}>
                  EUR
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        )}
      </Field>
      <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit]) => (
          <Button variant="outline" disabled={!canSubmit} type="submit">
            Submit exchange
          </Button>
        )}
      </Subscribe>
    </form>
  );
};
