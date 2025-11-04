'use server';

import { authFetch } from '@/core/http/model/auth-fetch';

import { SERVER_URL } from '@/shared/config/env';

import type { Account } from '../model/types';

export const getAccounts = async () =>
  await authFetch<Account[]>(`${SERVER_URL}/accounts`, {
    method: 'GET',
  });
