'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

import {
  PizzaCategories,
  PizzaContextProvider,
  PizzaSelectBlock,
  PizzaSorting,
  usePizzaContext,
} from '@/entities/pizza';
import { CartContextProvider, useCartContext } from '@/features/cart/context';
import { TheHeader } from '@/widgets/the-header';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <PizzaContextProvider>
        <CartContextProvider>
          <Content />
        </CartContextProvider>
      </PizzaContextProvider>
    </QueryClientProvider>
  );
}

function Content() {
  const { pizzas, isLoading } = usePizzaContext();
  const {
    increaseItemInCart,
    decreaseItemInCart,
    removeItemFromCard,
    getCountForItem,
    itemsInCartFlatCount,
  } = useCartContext();

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <main>
      <TheHeader itemsInCartCount={itemsInCartFlatCount} className="px-8" />
      <div className="flex px-8 pt-8 items-center justify-between">
        <PizzaCategories />
        <PizzaSorting />
      </div>
      <h2 className="text-2xl px-8 m-0 mt-12 font-semibold -mb-4">Все питсы</h2>
      <div className="flex flex-wrap justify-center px-8 py-8">
        {pizzas.map(pizza => (
          <PizzaSelectBlock
            key={pizza.id}
            pizza={pizza}
            className="mr-12 last:mr-0 mt-8"
            count={getCountForItem}
            onAddClick={increaseItemInCart}
            onRemoveClick={removeItemFromCard}
            onDecreaseClick={decreaseItemInCart}
            onIncreaseClick={increaseItemInCart}
          />
        ))}
      </div>
    </main>
  );
}
