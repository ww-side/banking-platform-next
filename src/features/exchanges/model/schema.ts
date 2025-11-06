import { v } from '@/shared/lib/forms';

export const createExchangeSchema = v.object({
  amount: v.pipe(v.string(), v.minLength(1, 'Amount is required')),
  toCurrency: v.pipe(v.string(), v.minLength(1, 'To currency is required')),
  fromCurrency: v.pipe(v.string(), v.minLength(1, 'From currency is required')),
});
