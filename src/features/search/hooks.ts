'use client';

import { useMemo } from 'react';

import { Pizza } from '@/entities/pizza';
import { useDebouncedValue } from '@/shared/hooks';

import { useSearchStore } from './store';

type Item = Pizza;

export function useSearchedItems(items: Item[]): Item[] {
  const { query } = useSearchStore();
  const debouncedQuery = useDebouncedValue(query, 150);

  const searchedItems = useMemo(() => {
    if (!debouncedQuery) return items;

    return items.filter(
      pizza => !debouncedQuery || pizza.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [debouncedQuery, items]);

  return searchedItems;
}
