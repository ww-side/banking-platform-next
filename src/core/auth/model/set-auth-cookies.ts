'use server';

import { cookies } from 'next/headers';

export const setAuthCookies = async (setCookieHeader: string | null) => {
  if (!setCookieHeader) return;

  const refreshToken = setCookieHeader.match(/refreshToken=([^;]+)/)?.[1];
  const accessToken = setCookieHeader.match(/accessToken=([^;]+)/)?.[1];

  if (!refreshToken || !accessToken) return;

  const cookie = await cookies();

  cookie.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  cookie.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
};
