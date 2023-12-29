import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { debounce, orderBy } from 'lodash';

import { getMinimumPizzaPrice } from '@/entities/pizza';
import { notReachable } from '@/shared/utils';

import { Pizza, PizzaDoughType, PizzaSize, PizzaTag, Sorting } from './types';

interface IPizzaContext {
  doughTypes: PizzaDoughType[];
  sizes: PizzaSize[];
  pizzas: Pizza[];
  tags: PizzaTag[];

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

const Context = createContext<IPizzaContext | null>(null);

const sortings: Sorting[] = [
  { id: '1', key: 'price', title: 'По цене (возр.)', direction: 'asc' },
  { id: '2', key: 'price', title: 'По цене (убыв.)', direction: 'desc' },
  { id: '3', key: 'alphabet', title: 'По алфавиту (возр.)', direction: 'asc' },
  { id: '4', key: 'alphabet', title: 'По алфавиту (убыв.)', direction: 'desc' },
];

export interface PizzaContextProviderProps extends PropsWithChildren {
  doughTypes: PizzaDoughType[];
  sizes: PizzaSize[];
  pizzas: Pizza[];
  tags: PizzaTag[];
}

export function PizzaContextProvider({
  tags,
  children,
  doughTypes,
  sizes,
  pizzas,
}: PizzaContextProviderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<PizzaTag>();
  const [selectedSorting, setSelectedSorting] = useState<Sorting>(sortings[0]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const fn = debounce(() => setDebouncedSearchQuery(searchQuery), 150);
    fn();
    return fn.cancel;
  }, [searchQuery]);

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

  const value: IPizzaContext = useMemo(
    () => ({
      doughTypes,
      sizes,
      pizzas: filteredAndSortedPizzas,

      // Search,
      searchQuery,
      setSearchQuery,

      // Sorting
      sortings,
      selectedSorting,
      setSelectedSorting,

      // FIlters
      tags,
      selectedTag,
      setSelectedTag,
    }),
    [doughTypes, filteredAndSortedPizzas, searchQuery, selectedSorting, selectedTag, sizes, tags],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function usePizzaContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Pizza context not found!');
  }

  return context;
}
