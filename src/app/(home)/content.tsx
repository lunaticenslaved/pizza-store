'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import {
  PageData,
  Pizza,
  PizzaSelectBlock,
  PizzaSelectDialog,
  PizzaSelectDialogProps,
  useDoughTypes,
  usePizzaSizes,
  usePizzaTags,
} from '@/entities/pizza';
import { useCartStore } from '@/features/cart';
import { useFilteredItems } from '@/features/filters';
import { useSearchedItems } from '@/features/search';
import { useSortedItems } from '@/features/sorting';

export default function Providers(props: PageData) {
  return <Content {...props} />;
}

function Content({ pizzas: pizzasProp, tags, doughTypes, sizes }: PageData) {
  const [_1, setDoughTypes] = useDoughTypes();
  const [_2, setPizzaSizes] = usePizzaSizes();
  const [_3, setPizzaTags] = usePizzaTags();

  useEffect(() => {
    setPizzaSizes(sizes);
    setDoughTypes(doughTypes);
    setPizzaTags(tags);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedItems = useSortedItems(pizzasProp);
  const searchedItems = useSearchedItems(sortedItems);
  const pizzas = useFilteredItems(searchedItems);

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
    <>
      {currentPizza && (
        <PizzaSelectDialog
          isOpen={!!currentPizza}
          onClose={closeDialog}
          pizza={currentPizza}
          onAddClick={addPizza}
        />
      )}

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
        <div className="flex flex-col w-100 h-full justify-center items-center">
          <Image src="/images/pizza.png" alt="Pizza" height="400" width="400" />
          <h6 className="text-lg font-bold mt-6">Не найдено ни одной питсы :-(</h6>
        </div>
      )}
    </>
  );
}
