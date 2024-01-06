'use client';

import { useMemo } from 'react';

import orderBy from 'lodash/orderBy';

import { Pizza, getMinimumPizzaPrice } from '@/entities/pizza';
import { notReachable } from '@/shared/utils';

import { useSortingStore } from './store';

type Item = Pizza;

export function useSortedItems(items: Item[]): Item[] {
  const { key, direction } = useSortingStore();

  const sortedItems = useMemo(() => {
    return orderBy(
      items,
      pizza => {
        if (key === 'price') {
          return getMinimumPizzaPrice(pizza);
        } else if (key === 'alphabet') {
          return pizza.name;
        } else {
          notReachable(key);
        }
      },
      direction,
    );
  }, [items, direction, key]);

  return sortedItems;
}
