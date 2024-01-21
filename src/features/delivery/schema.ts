import { z } from 'zod';

export const schema = z.object({
  address: z.string().min(1, 'Укажите адрес'),
  phone: z.string().min(1, 'Укажите телефон'),
  comment: z.string(),
});
