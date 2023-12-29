'use client';

import { useCallback, useMemo, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Image from 'next/image';

import {
  Pizza,
  PizzaContextProvider,
  PizzaFilter,
  PizzaSelectBlock,
  PizzaSelectDialog,
  PizzaSelectDialogProps,
  PizzaSorting,
  usePizzaContext,
} from '@/entities/pizza';
import { CartContextProvider, CartSidebar, useCartContext } from '@/features/cart';
import { TheHeader } from '@/widgets/the-header';

import { PageData } from './actions';

export default function Providers(props: PageData) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PizzaContextProvider {...props}>
        <CartContextProvider>
          <Content />
        </CartContextProvider>
      </PizzaContextProvider>
    </QueryClientProvider>
  );
}

function Content() {
  const {
    pizzas,
    selectedTag,
    setSelectedTag,
    tags,
    sortings,
    selectedSorting,
    setSelectedSorting,
  } = usePizzaContext();
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

  return (
    <main className="flex flex-col h-full">
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
        <PizzaFilter tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
        <PizzaSorting
          sortings={sortings}
          selectedSorting={selectedSorting}
          onSortingChange={setSelectedSorting}
        />
      </div>

      {pizzas.length ? (
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
      ) : (
        <div className="flex flex-col w-100 flex-1 justify-center items-center">
          <Image src="/images/pizza.png" alt="Pizza" height="400" width="400" />
          <h6 className="text-lg font-bold">Не найдено ни одной питсы :-(</h6>
        </div>
      )}
    </main>
  );
}
