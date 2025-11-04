import { cookies } from 'next/headers';

import type { User } from '@/core/user/model/types';

export const setPersonalInfo = async (user: User) => {
  const cookie = await cookies();
  cookie.set('username', user.username);
};
