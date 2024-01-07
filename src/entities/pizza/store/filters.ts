import { create } from 'zustand';

import { PizzaFilters } from '../types';

interface IPizzaFiltersStore extends PizzaFilters {
  setFilters(values: PizzaFilters): void;
}

export const usePizzaFiltersStore = create<IPizzaFiltersStore>(set => ({
  tag: undefined,
  prices: [],

  setFilters: values =>
    set({
      tag: values.tag,
      prices: [...values.prices],
    }),
}));
