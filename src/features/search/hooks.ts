'use client';

import { useEffect, useMemo, useState } from 'react';

import { debounce } from 'lodash';

import { Pizza } from '@/entities/pizza';

import { useSearchStore } from './store';

type Item = Pizza;

export function useSearchedItems(items: Item[]): Item[] {
  const { query } = useSearchStore();
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const fn = debounce(() => setDebouncedQuery(query), 150);
    fn();
    return fn.cancel;
  }, [query]);

  const searchedItems = useMemo(() => {
    if (!debouncedQuery) return items;

    return items.filter(
      pizza => !debouncedQuery || pizza.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [debouncedQuery, items]);

  return searchedItems;
}
