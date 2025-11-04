'use server';

import type { HttpResponse } from '@/core/http/model/types';
import type { User } from '@/core/user/model/types';

import { SERVER_URL } from '@/shared/config/env';

import { setAuthCookies } from '../model/set-auth-cookies';
import { setPersonalInfo } from '../model/set-personal-info';

export const register = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): HttpResponse<User & { accessToken: string; refreshToken: string }> => {
  try {
    const res = await fetch(`${SERVER_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await res.json();

    await setAuthCookies(res.headers.get('set-cookie'));
    await setPersonalInfo(data.user);

    return data;
  } catch (error) {
    throw error;
  }
};
