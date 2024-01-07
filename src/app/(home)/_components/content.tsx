'use client';

import { useCallback, useMemo, useState } from 'react';

import Image from 'next/image';

import {
  Pizza,
  PizzaData,
  PizzaSelectBlock,
  PizzaSelectDialog,
  PizzaSelectDialogProps,
} from '@/entities/pizza';
import { useCartStore } from '@/features/cart';
import { useFilteredItems } from '@/features/filters';
import { useSearchedItems } from '@/features/search';
import { useSortedItems } from '@/features/sorting';
import { NAVBAR_SECTIONS, PIZZA_SECTION, ROLLS_SECTION, SUSHI_SECTION } from '@/widgets/the-navbar';

import { ItemsSection } from './items-section';

export default function Content({ pizzas: pizzasProp }: PizzaData) {
  const sortedItems = useSortedItems(pizzasProp);
  const searchedItems = useSearchedItems(sortedItems);
  const pizzas = useFilteredItems(searchedItems);
  const hasItems = !!pizzas.length;

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

  const sections = [
    {
      section: PIZZA_SECTION,
      content: (
        <>
          {pizzas.map(pizza => (
            <PizzaSelectBlock
              key={pizza.id}
              pizza={pizza}
              className="mx-6 mt-8"
              count={getCountForItem(pizza)}
              onAddClick={openDialog}
            />
          ))}
        </>
      ),
    },
    {
      section: SUSHI_SECTION,
      content: (
        <div className="flex items-center justify-center">
          <h6>Здесь пока ничего нет :(</h6>
        </div>
      ),
    },
    {
      section: ROLLS_SECTION,
      content: (
        <div className="flex items-center justify-center">
          <h6>Здесь пока ничего нет :(</h6>
        </div>
      ),
    },
  ].sort(
    (a, b) =>
      NAVBAR_SECTIONS.findIndex(s => s.id === a.section.id) -
      NAVBAR_SECTIONS.findIndex(s => s.id === b.section.id),
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

      {hasItems ? (
        <>
          {sections.map(({ section, content }) => (
            <ItemsSection key={section.id} id={section.id} title={section.title}>
              {content}
            </ItemsSection>
          ))}
        </>
      ) : (
        <section className="flex flex-col w-100 h-full justify-center items-center">
          <Image src="/images/pizza.png" alt="Pizza" height="400" width="400" />
          <h6 className="text-lg font-bold mt-6">Не найдено ни одной питсы :-(</h6>
        </section>
      )}
    </>
  );
}
