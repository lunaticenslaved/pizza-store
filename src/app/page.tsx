'use client';

import { useCallback, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  Pizza,
  PizzaCategories,
  PizzaContextProvider,
  PizzaSelectBlock,
  PizzaSelectDialog,
  PizzaSelectDialogProps,
  PizzaSorting,
  usePizzaContext,
} from '@/entities/pizza';
import { CartContextProvider, CartSidebar, useCartContext } from '@/features/cart';
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
  const { getCountForItem, itemsInCartFlatCount, increaseItemInCart, totalPrice } =
    useCartContext();
  const [currentPizza, setCurrentPizza] = useState<Pizza>();
  const [isCartSidebarOpen, setCartSidebarOpen] = useState(false);

  const { openDialog, closeDialog, openCartSidebar, closeCartSidebar } = useMemo(
    () => ({
      openDialog(pizza: Pizza) {
        setCurrentPizza(pizza);
      },
      closeDialog() {
        setCurrentPizza(undefined);
      },
      openCartSidebar() {
        setCartSidebarOpen(true);
      },
      closeCartSidebar() {
        setCartSidebarOpen(false);
      },
    }),
    [],
  );

  const addPizza: PizzaSelectDialogProps['onAddClick'] = useCallback(
    data => {
      increaseItemInCart(data);
      closeDialog();
    },
    [closeDialog, increaseItemInCart],
  );

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <main>
      {currentPizza && (
        <PizzaSelectDialog
          isOpen={!!currentPizza}
          onClose={closeDialog}
          pizza={currentPizza}
          onAddClick={addPizza}
        />
      )}
      <CartSidebar isOpen={isCartSidebarOpen} onClose={closeCartSidebar} />
      <TheHeader
        totalPrice={totalPrice}
        itemsInCartCount={itemsInCartFlatCount}
        className="px-8"
        onCartClick={openCartSidebar}
      />
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
            count={getCountForItem(pizza)}
            onAddClick={openDialog}
            onRemoveClick={() => {}}
          />
        ))}
      </div>
    </main>
  );
}
