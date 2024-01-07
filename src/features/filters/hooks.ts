import { Pizza, useFilteredPizza, usePizzaFiltersStore } from '@/entities/pizza';

type Item = Pizza;

export function useFilteredItems(items: Item[]): Item[] {
  const { tag, prices } = usePizzaFiltersStore(s => s);

  return useFilteredPizza({ tag, prices }, items);
}
