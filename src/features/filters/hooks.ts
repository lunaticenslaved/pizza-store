import { useMemo } from 'react';

import { Pizza } from '@/entities/pizza';
import { useFiltersStore } from '@/features/filters/store';

type Item = Pizza;

export function useFilteredItems(items: Item[]): Item[] {
  const { tag } = useFiltersStore();

  const filteredItems = useMemo(() => {
    if (!tag) return items;

    return items.filter(pizza => !tag || pizza.tags.some(tagId => tagId === tag.id));
  }, [items, tag]);

  return filteredItems;
}
