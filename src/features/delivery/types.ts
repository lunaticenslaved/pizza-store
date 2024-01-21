import { z } from 'zod';

import { schema } from './schema';

export interface DeliveryInfo {
  id: string;
  address: string;
  phone: string;
  comment: string;
}

export type DeliveryInfoFormValues = z.infer<typeof schema>;
