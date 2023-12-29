import { Pizza } from '@/entities/pizza';

export interface InCartItem {
  id: string;
  pizza: Pizza;
  price: number;
  count: number;
  doughTypeId: string;
  sizeId: string;
}

export type InCardItemAction = Pick<InCartItem, 'doughTypeId' | 'pizza' | 'sizeId'>;
