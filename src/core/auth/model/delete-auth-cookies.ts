'use server';

import { cookies } from 'next/headers';

export const deleteAuthCookies = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
