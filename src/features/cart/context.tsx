import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Pizza } from '@/entities/pizza/types';

interface InCartItem {
  id: string;
  pizza: Pizza;
  price: number;
  count: number;
  doughTypeId: string;
  sizeId: string;
}

type InCardItemAction = Pick<InCartItem, 'doughTypeId' | 'pizza' | 'sizeId'>;

interface ICartContext {
  items: InCartItem[];
  itemsInCartFlatCount: number;
  totalPrice: number;
  getCountForItem(pizza: Pizza): number;
  increaseItemInCart(item: InCardItemAction): void;
  decreaseItemInCart(item: InCardItemAction): void;
  removeItemFromCard(item: InCardItemAction): void;
}

const Context = createContext<ICartContext | null>(null);

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

export function CartContextProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<InCartItem[]>([]);

  const increaseItemInCart = useCallback((item: InCardItemAction) => {
    setItems(curItems => {
      const [_, existingIndex] = findItem(curItems, item);

      const price = item.pizza.prices.find(({ sizeId }) => sizeId === item.sizeId);

      if (!price) {
        throw new Error('Price not found');
      }

      if (existingIndex === -1) {
        return [...curItems, { ...item, id: Date.now().toString(), count: 1, price: price.price }];
      }

      return curItems.map((curItem, curIdx) => {
        if (curIdx === existingIndex) {
          return { ...curItem, count: curItem.count + 1, price: price.price };
        }

        return curItem;
      });
    });
  }, []);

  const decreaseItemInCart = useCallback((item: InCardItemAction) => {
    setItems(curItems => {
      const [_, existingIndex] = findItem(curItems, item);

      if (existingIndex === -1) {
        return curItems;
      }

      const arr: InCartItem[] = [];

      curItems.forEach((curItem, curIdx) => {
        if (curIdx !== existingIndex) {
          arr.push(curItem);
        } else {
          const count = curItem.count - 1;

          if (count > 0) {
            arr.push({ ...curItem, count });
          }
        }
      });

      return arr;
    });
  }, []);

  const removeItemFromCard = useCallback((item: InCardItemAction) => {
    setItems(curItems => {
      const [_, existingIndex] = findItem(curItems, item);

      if (existingIndex === -1) {
        return curItems;
      }

      return curItems.filter((_, index) => index !== existingIndex);
    });
  }, []);

  const getCountForItem = useCallback(
    (pizza: Pizza) => {
      return items
        .filter(curItem => curItem.pizza.id === pizza.id)
        .reduce((acc, curItem) => acc + curItem.count, 0);
    },
    [items],
  );

  const { itemsInCartFlatCount, totalPrice } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.itemsInCartFlatCount += item.count;
        acc.totalPrice += item.price * item.count;

        return acc;
      },
      {
        itemsInCartFlatCount: 0,
        totalPrice: 0,
      },
    );
  }, [items]);

  const value: ICartContext = useMemo(
    () => ({
      items,
      itemsInCartFlatCount,
      totalPrice,
      increaseItemInCart,
      decreaseItemInCart,
      getCountForItem,
      removeItemFromCard,
    }),
    [
      items,
      itemsInCartFlatCount,
      totalPrice,
      increaseItemInCart,
      decreaseItemInCart,
      getCountForItem,
      removeItemFromCard,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCartContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Cart context not found!');
  }

  return context;
}
