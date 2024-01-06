import { create } from 'zustand';

import { Sorting, SortingDirection, SortingKey } from './types';

interface ISortingStore {
  key: SortingKey;
  direction: SortingDirection;
  setSorting(value: Sorting): void;
}

export const useSortingStore = create<ISortingStore>(set => ({
  key: 'price',
  direction: 'asc',
  setSorting: ({ key, direction }) => set({ key, direction }),
}));
