'use server';

import { authFetch } from '@/core/http/model/auth-fetch';

import { SERVER_URL } from '@/shared/config/env';

import type { User } from '../model/types';

export const getUsers = async () =>
  await authFetch<User[]>(`${SERVER_URL}/users`, {
    method: 'GET',
  });
