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

import { createTransfer } from '../api/create-transfer';
import { createTransferSchema } from '../model/schema';

export const TransferForm = ({ users }: { users: User[] }) => {
  const addTransaction = useTransactionsDataStore(
    state => state.addTransaction,
  );

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: '',
      currency: 'USD',
      description: '',
      toUserId: '',
    },
    validators: {
      onChange: createTransferSchema,
    },
    onSubmit: async data => {
      const { value } = data;

      const res = await createTransfer(value);

      if ('error' in res) {
        notify(
          Array.isArray(res.message) ? res.message.join(', ') : res.message,
        );
      } else {
        console.log('@res', res);
        addTransaction(res);
        notify('Transfer successful');
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
      <Field name="currency">
        {field => (
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
      <Field name="description">
        {field => (
          <TextField
            name={field.name}
            label="Description"
            placeholder="Description"
            value={String(field.state.value)}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            intent={field.state.meta.errors.length ? 'danger' : 'primary'}
            hint={field.state.meta.errors
              .map(error => error?.message)
              .join(', ')}
          />
        )}
      </Field>
      <Field name="toUserId">
        {field => {
          const selectedUser = users.find(
            user => user.id === field.state.value,
          );

          return (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {selectedUser
                  ? `${selectedUser.username} - ${selectedUser.email}`
                  : 'Select a user'}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {users.map(user => (
                  <DropdownMenuItem
                    key={user.id}
                    onClick={() => field.handleChange(user.id)}
                  >
                    {user.username}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }}
      </Field>
      <Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit]) => (
          <Button variant="outline" disabled={!canSubmit} type="submit">
            Submit transfer
          </Button>
        )}
      </Subscribe>
    </form>
  );
};
