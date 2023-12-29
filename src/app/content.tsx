'use client';

import { useCallback, useMemo, useState } from 'react';

import Image from 'next/image';

import {
  Pizza,
  PizzaContextProvider,
  PizzaFilter,
  PizzaSearch,
  PizzaSelectBlock,
  PizzaSelectDialog,
  PizzaSelectDialogProps,
  PizzaSorting,
  usePizzaContext,
} from '@/entities/pizza';
import { useCartStore } from '@/features/cart';
import { Layout } from '@/widgets/layout';

import { PageData } from './actions';

export default function Providers(props: PageData) {
  return (
    <PizzaContextProvider {...props}>
      <Content />
    </PizzaContextProvider>
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
    searchQuery,
    setSearchQuery,
  } = usePizzaContext();
  const increaseItemInCart = useCartStore(s => s.increaseItemInCart);
  const getCountForItem = useCartStore(s => s.getCountForItem);
  const [currentPizza, setCurrentPizza] = useState<Pizza>();

  const { openDialog, closeDialog } = useMemo(
    () => ({
      openDialog(pizza: Pizza) {
        setCurrentPizza(pizza);
      },
      closeDialog() {
        setCurrentPizza(undefined);
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
    <Layout>
      {currentPizza && (
        <PizzaSelectDialog
          isOpen={!!currentPizza}
          onClose={closeDialog}
          pizza={currentPizza}
          onAddClick={addPizza}
        />
      )}

      <div className="flex px-8 pt-8 items-center justify-between flex-wrap">
        <PizzaFilter
          className="overflow-x-auto -mx-8 sm:mx-0"
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
        <PizzaSearch
          className="my-4 mt-8 sm:mt-4 w-max sm:w-48"
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <PizzaSorting
          className="my-2"
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
              className="mx-6 mt-8"
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
    </Layout>
  );
}
