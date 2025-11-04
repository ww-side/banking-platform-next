import { v } from '@/shared/lib/forms';

export const loginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.email('Invalid email address'),
    v.minLength(1, 'Email is required'),
  ),
  password: v.pipe(
    v.string('Password is required'),
    v.minLength(6, 'Password must be at least 6 characters long'),
  ),
});
