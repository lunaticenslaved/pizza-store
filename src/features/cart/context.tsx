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
  pizza: Pizza;
  price: number;
  count: number;
  doughType: string;
  size: string;
}

type InCardItemAction = Pick<InCartItem, 'doughType' | 'pizza' | 'size' | 'price'>;

interface ICartContext {
  items: InCartItem[];
  itemsInCartFlatCount: number;
  totalPrice: number;
  getCountForItem(item: Pick<InCartItem, 'pizza'>): number;
  increaseItemInCart(item: InCardItemAction): void;
  decreaseItemInCart(item: InCardItemAction): void;
  removeItemFromCard(item: InCardItemAction): void;
}

const Context = createContext<ICartContext | null>(null);

function findItem(items: InCartItem[], item: InCardItemAction): [InCartItem | undefined, number] {
  const index = items.findIndex(
    curItem =>
      curItem.pizza.id === item.pizza.id &&
      curItem.doughType === item.doughType &&
      curItem.size === item.size,
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

      if (existingIndex === -1) {
        return [...curItems, { ...item, count: 1 }];
      }

      return curItems.map((curItem, curIdx) => {
        if (curIdx === existingIndex) {
          return { ...curItem, count: curItem.count + 1 };
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
        }

        const count = curItem.count - 1;

        if (count > 0) {
          arr.push({ ...curItem, count });
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
    (item: Pick<InCartItem, 'pizza'>) => {
      return items
        .filter(curItem => curItem.pizza.id === item.pizza.id)
        .reduce((acc, curItem) => acc + curItem.count, 0);
    },
    [items],
  );

  const { itemsInCartFlatCount, totalPrice } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.itemsInCartFlatCount += item.count;
        acc.totalPrice += item.price;

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
