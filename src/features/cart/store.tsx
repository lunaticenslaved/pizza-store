'use client';

import { useMemo } from 'react';

import { create } from 'zustand';

import { Pizza } from '@/entities/pizza';

import { InCardItemAction, InCartItem } from './types';

interface ICartStore {
  items: InCartItem[];
  clearCart(): void;
  getCountForItem(pizza: Pizza): number;
  increaseItemInCart(item: InCardItemAction): void;
  decreaseItemInCart(item: InCardItemAction): void;
  removeItemFromCart(item: InCardItemAction): void;
}

function findItem(items: InCartItem[], item: InCardItemAction): [InCartItem | undefined, number] {
  const index = items.findIndex(
    curItem =>
      curItem.pizza.id === item.pizza.id &&
      curItem.doughTypeId === item.doughTypeId &&
      curItem.sizeId === item.sizeId,
  );

  if (index === -1) {
    return [undefined, -1];
  }

  return [items[index], index];
}

export const useCartStore = create<ICartStore>((set, getState) => ({
  items: [],
  clearCart: () => set({ items: [] }),
  getCountForItem: pizza => {
    const { items } = getState();
    return items
      .filter(curItem => curItem.pizza.id === pizza.id)
      .reduce((acc, curItem) => acc + curItem.count, 0);
  },
  increaseItemInCart: item => {
    set(({ items }) => {
      const [_, existingIndex] = findItem(items, item);

      const price = item.pizza.prices.find(({ sizeId }) => sizeId === item.sizeId);

      if (!price) {
        throw new Error('Price not found');
      }

      if (existingIndex === -1) {
        return {
          items: [...items, { ...item, id: Date.now().toString(), count: 1, price: price.price }],
        };
      }

      return {
        items: items.map((curItem, curIdx) => {
          if (curIdx === existingIndex) {
            return { ...curItem, count: curItem.count + 1, price: price.price };
          }

          return curItem;
        }),
      };
    });
  },
  decreaseItemInCart: item => {
    set(({ items }) => {
      const [_, existingIndex] = findItem(items, item);

      if (existingIndex === -1) {
        return { items };
      }

      const arr: InCartItem[] = [];

      items.forEach((curItem, curIdx) => {
        if (curIdx !== existingIndex) {
          arr.push(curItem);
        } else {
          const count = curItem.count - 1;

          if (count > 0) {
            arr.push({ ...curItem, count });
          }
        }
      });

      return { items: arr };
    });
  },
  removeItemFromCart: item => {
    set(({ items }) => {
      const [_, existingIndex] = findItem(items, item);

      if (existingIndex === -1) {
        return { items };
      }

      return {
        items: items.filter((_, index) => index !== existingIndex),
      };
    });
  },
}));

export function useTotalPriceSelector() {
  const items = useCartStore(s => s.items);
  return useMemo(() => items.reduce((acc, item) => acc + item.price * item.count, 0), [items]);
}

export function useItemsInCartCountSelector() {
  const items = useCartStore(s => s.items);
  return useMemo(() => items.reduce((acc, item) => acc + item.count, 0), [items]);
}

export function useItemsSelector() {
  const items = useCartStore(s => s.items);
  return items;
}
