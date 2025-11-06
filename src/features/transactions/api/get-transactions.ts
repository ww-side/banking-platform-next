'use server';

import { authFetch } from '@/core/http/model/auth-fetch';

import { SERVER_URL } from '@/shared/config/env';

import type { Transaction } from '../model/types';

export const getTransactions = async ({
  params,
}: {
  params: { page?: number; limit?: number; type?: 'transfer' | 'exchange' };
}) => {
  const { page, limit, type } = params;

  return await authFetch<Transaction>(
    `${SERVER_URL}/transactions?page=${page}&limit=${limit}&type=${type}`,
    {
      method: 'GET',
    },
  );
};
