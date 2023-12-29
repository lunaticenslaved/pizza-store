import { create } from 'zustand';

import { PizzaDoughType } from '@/entities/pizza';
import { PizzaSize } from '@/entities/pizza/types';

interface IPizzaStore {
  doughTypes: PizzaDoughType[];
  setDoughTypes(value: PizzaDoughType[]): void;
  sizes: PizzaSize[];
  setSizes(value: PizzaSize[]): void;
}

export const usePizzaStore = create<IPizzaStore>(set => ({
  doughTypes: [],
  setDoughTypes: doughTypes => set({ doughTypes }),
  sizes: [],
  setSizes: sizes => set({ sizes }),
}));

export function useDoughTypes(): [IPizzaStore['doughTypes'], IPizzaStore['setDoughTypes']] {
  const doughTypes = usePizzaStore(s => s.doughTypes);
  const setDoughTypes = usePizzaStore(s => s.setDoughTypes);
  return [doughTypes, setDoughTypes];
}

export function usePizzaSizes(): [IPizzaStore['sizes'], IPizzaStore['setSizes']] {
  const sizes = usePizzaStore(s => s.sizes);
  const setSizes = usePizzaStore(s => s.setSizes);
  return [sizes, setSizes];
}
