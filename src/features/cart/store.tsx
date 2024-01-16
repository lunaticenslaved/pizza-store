'use client';

import { useMemo } from 'react';

import { create } from 'zustand';

import { Pizza } from '@/entities/pizza';

import { InCardItemAction, InCartItem } from './types';
import { saveItemsInStorage } from './utils';

// TODO: add saving items for authorized user in database. Summarize items from localStorage and DB when signed-in

interface ICartStore {
  items: InCartItem[];
  clearCart(): void;
  setItems(items: InCartItem[]): void;
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
  setItems: items => set(saveItemsInStorage({ items })),
  clearCart: () => set(saveItemsInStorage({ items: [] })),
  getCountForItem: pizza => {
    const { items } = getState();

    return items
      .filter(curItem => curItem.pizza.id === pizza.id)
      .reduce((acc, curItem) => acc + curItem.count, 0);
  },
  increaseItemInCart: item => {
    set(({ items }) => {
      const [_, existingIndex] = findItem(items, item);

      const price = item.pizza.prices.find(({ size }) => size.id === item.sizeId);
      let newItems: InCartItem[] = [];

      if (!price) {
        throw new Error('Price not found');
      }

      if (existingIndex === -1) {
        newItems = [...items, { ...item, id: Date.now().toString(), count: 1, price: price.rub }];
      } else {
        newItems = items.map((curItem, curIdx) => {
          if (curIdx === existingIndex) {
            return { ...curItem, count: curItem.count + 1, price: price.rub };
          }

          return curItem;
        });
      }

      return saveItemsInStorage({ items: newItems });
    });
  },
  decreaseItemInCart: item => {
    set(({ items }) => {
      const [_, existingIndex] = findItem(items, item);

      if (existingIndex === -1) {
        return { items };
      }

      const newItems: InCartItem[] = [];

      items.forEach((curItem, curIdx) => {
        if (curIdx !== existingIndex) {
          newItems.push(curItem);
        } else {
          const count = curItem.count - 1;

          if (count > 0) {
            newItems.push({ ...curItem, count });
          }
        }
      });

      return saveItemsInStorage({ items: newItems });
    });
  },
  removeItemFromCart: item => {
    set(({ items }) => {
      const [_, existingIndex] = findItem(items, item);

      const newItems: InCartItem[] =
        existingIndex === -1 ? items : items.filter((_, index) => index !== existingIndex);

      return saveItemsInStorage({ items: newItems });
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

export function useCartItemsState(): [ICartStore['items'], ICartStore['setItems']] {
  const items = useCartStore(s => s.items);
  const setItems = useCartStore(s => s.setItems);
  return [items, setItems];
}
