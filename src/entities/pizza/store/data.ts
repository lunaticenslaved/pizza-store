import { create } from 'zustand';

import { PizzaDoughType } from '@/entities/pizza';
import { PizzaSize, PizzaTag } from '@/entities/pizza/types';

import { Pizza } from '../types';

interface IPizzaStore {
  doughTypes: PizzaDoughType[];
  setDoughTypes(value: PizzaDoughType[]): void;

  sizes: PizzaSize[];
  setSizes(value: PizzaSize[]): void;

  tags: PizzaTag[];
  setTags(value: PizzaTag[]): void;

  pizzas: Pizza[];
  setPizzas(value: Pizza[]): void;
}

export const usePizzaStore = create<IPizzaStore>(set => ({
  doughTypes: [],
  setDoughTypes: doughTypes => set({ doughTypes }),

  sizes: [],
  setSizes: sizes => set({ sizes }),

  tags: [],
  setTags: tags => set({ tags }),

  pizzas: [],
  setPizzas: pizzas => set({ pizzas }),
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

export function usePizzaTags(): [IPizzaStore['tags'], IPizzaStore['setTags']] {
  const tags = usePizzaStore(s => s.tags);
  const setTags = usePizzaStore(s => s.setTags);
  return [tags, setTags];
}

export function usePizzas(): [IPizzaStore['pizzas'], IPizzaStore['setPizzas']] {
  const pizzas = usePizzaStore(s => s.pizzas);
  const setPizzas = usePizzaStore(s => s.setPizzas);
  return [pizzas, setPizzas];
}
