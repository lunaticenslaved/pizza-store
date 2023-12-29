import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { debounce, orderBy } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { getMinimumPizzaPrice } from '@/entities/pizza';
import { notReachable } from '@/shared/utils';

import { useDoughTypes, usePizzaSizes } from './store';
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
  const searchParams = useSearchParams();

  const [_doughTypes, setDoughTypes] = useDoughTypes();
  const [_sizes, setSizes] = usePizzaSizes();

  useEffect(() => {
    setDoughTypes(doughTypes);
    setSizes(sizes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes, doughTypes]);

  const [searchQuery, setSearchQuery] = useState(() => {
    return decodeURIComponent(searchParams.get('search') || '');
  });
  const [selectedTag, setSelectedTag] = useState<PizzaTag | undefined>(() => {
    const tagId = decodeURIComponent(searchParams.get('tag') || '');
    return tagId ? tags.find(({ id }) => tagId === id) : undefined;
  });
  const [selectedSorting, setSelectedSorting] = useState<Sorting>(sortings[0]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const pathname = usePathname();
  const router = useRouter();

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
