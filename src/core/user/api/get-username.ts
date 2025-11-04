'use server';

import { cookies } from 'next/headers';

export const getUsername = async () => {
  const cookie = await cookies();
  return cookie.get('username')?.value ?? 'User';
};
