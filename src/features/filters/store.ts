import { create } from 'zustand';

import { PizzaTag } from '@/entities/pizza';

interface IFiltersStore {
  tag?: PizzaTag;
  setTag(value?: PizzaTag): void;
}

export const useFiltersStore = create<IFiltersStore>(set => ({
  tag: undefined,
  setTag: tag => set({ tag }),
}));
