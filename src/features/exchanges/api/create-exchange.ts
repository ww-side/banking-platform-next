'use server';

import { authFetch } from '@/core/http/model/auth-fetch';

import { SERVER_URL } from '@/shared/config/env';

import type { Exchange } from '../model/types';

export const createExchange = async ({
  amount,
  toCurrency,
  fromCurrency,
}: {
  amount: string;
  toCurrency: string;
  fromCurrency: string;
}) =>
  await authFetch<Exchange>(`${SERVER_URL}/transactions/exchange`, {
    method: 'POST',
    body: JSON.stringify({
      amount: Number(amount),
      toCurrency,
      fromCurrency,
    }),
  });
