import { v } from '@/shared/lib/forms';

export const registerSchema = v.object({
  email: v.pipe(
    v.string(),
    v.email('Invalid email address'),
    v.minLength(1, 'Email is required'),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(6, 'Password must be at least 6 characters long'),
  ),
  username: v.pipe(
    v.string(),
    v.minLength(3, 'Username must be at least 3 characters long'),
  ),
});
