'use server';

import { authFetch } from '@/core/http/model/auth-fetch';

import { SERVER_URL } from '@/shared/config/env';

import type { Transfer } from '../model/types';

export const createTransfer = async ({
  amount,
  currency,
  description,
  toUserId,
}: {
  toUserId: string;
  amount: string;
  currency: string;
  description?: string;
}) =>
  await authFetch<Transfer>(`${SERVER_URL}/transactions/transfer`, {
    method: 'POST',
    body: JSON.stringify({
      amount: Number(amount),
      currency,
      description,
      toUserId,
    }),
  });
