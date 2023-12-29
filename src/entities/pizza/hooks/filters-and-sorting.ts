import { useEffect, useMemo, useState } from 'react';

import debounce from 'lodash/debounce';
import orderBy from 'lodash/orderBy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { notReachable } from '@/shared/utils';

import { Pizza, PizzaTag, Sorting } from '../types';
import { getMinimumPizzaPrice } from '../utils';

const sortings: Sorting[] = [
  { id: '1', key: 'price', title: 'По цене (возр.)', direction: 'asc' },
  { id: '2', key: 'price', title: 'По цене (убыв.)', direction: 'desc' },
  { id: '3', key: 'alphabet', title: 'По алфавиту (возр.)', direction: 'asc' },
  { id: '4', key: 'alphabet', title: 'По алфавиту (убыв.)', direction: 'desc' },
];

interface IFiltersAndSorting {
  pizzas: Pizza[];

  // Search
  searchQuery: string;
  setSearchQuery(value: string): void;

  // Sorting
  sortings: Sorting[];
  selectedSorting: Sorting;
  setSelectedSorting(value: Sorting): void;

  // Filters
  selectedTag?: PizzaTag;
  setSelectedTag(value?: PizzaTag): void;
}

export function useFiltersAndSorting(pizzas: Pizza[], tags: PizzaTag[]): IFiltersAndSorting {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(() => {
    return decodeURIComponent(searchParams.get('search') || '');
  });
  const [selectedTag, setSelectedTag] = useState<PizzaTag | undefined>(() => {
    const tagId = decodeURIComponent(searchParams.get('tag') || '');
    return tagId ? tags.find(({ id }) => tagId === id) : undefined;
  });
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedSorting, setSelectedSorting] = useState<Sorting>(sortings[0]);

  const filteredPizzas = useMemo(() => {
    if (!selectedTag && !debouncedSearchQuery) return pizzas;

    return pizzas.filter(
      pizza =>
        (!selectedTag || pizza.tags.some(tagId => tagId === selectedTag.id)) &&
        (!debouncedSearchQuery ||
          pizza.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())),
    );
  }, [pizzas, debouncedSearchQuery, selectedTag]);

  const filteredAndSortedPizzas = useMemo(() => {
    return orderBy(
      filteredPizzas,
      pizza => {
        if (selectedSorting.key === 'price') {
          return getMinimumPizzaPrice(pizza);
        } else if (selectedSorting.key === 'alphabet') {
          return pizza.name;
        } else {
          notReachable(selectedSorting.key);
        }
      },
      selectedSorting.direction,
    );
  }, [filteredPizzas, selectedSorting.direction, selectedSorting.key]);

  useEffect(() => {
    const fn = debounce(() => setDebouncedSearchQuery(searchQuery), 150);
    fn();
    return fn.cancel;
  }, [searchQuery]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (searchQuery) {
      newSearchParams.set('search', encodeURIComponent(searchQuery));
    }

    if (selectedTag) {
      newSearchParams.set('tag', encodeURIComponent(selectedTag.id));
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }, [searchQuery, pathname, router, selectedTag]);

  return useMemo(
    () => ({
      pizzas: filteredAndSortedPizzas,

      searchQuery,
      setSearchQuery,

      sortings,
      selectedSorting,
      setSelectedSorting,

      selectedTag,
      setSelectedTag,
    }),
    [filteredAndSortedPizzas, searchQuery, selectedSorting, selectedTag],
  );
}
