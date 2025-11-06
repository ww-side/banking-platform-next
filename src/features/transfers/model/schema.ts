import { v } from '@/shared/lib/forms';

export const createTransferSchema = v.object({
  amount: v.pipe(v.string(), v.minLength(1, 'Amount is required')),
  currency: v.pipe(
    v.literal('USD', 'EUR'),
    v.minLength(1, 'Currency is required'),
  ),
  description: v.pipe(v.string()),
  toUserId: v.pipe(v.string(), v.minLength(1, 'To user is required')),
});
