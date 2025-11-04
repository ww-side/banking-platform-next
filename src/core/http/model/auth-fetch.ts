import { getTokes } from './get-token';
import type { HttpResponse } from './types';

export const authFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<HttpResponse<T>> => {
  const { accessToken } = await getTokes();

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  return await res.json();
};
