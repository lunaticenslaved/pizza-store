'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import { useDoughTypes, usePizzaSizes } from '@/entities/pizza';
import { Sidebar } from '@/shared/ui/sidebar';

import { useCartSidebar } from '../hooks/use-sidebar';
import { useCartStore, useTotalPriceSelector } from '../store';

import { EmptyCart } from './empty';
import { GoToCartButton } from './go-to-cart-button';

const paddingClass = 'px-6';

export function CartSidebar() {
  const removeItemFromCart = useCartStore(s => s.removeItemFromCart);
  const decreaseItemInCart = useCartStore(s => s.decreaseItemInCart);
  const increaseItemInCart = useCartStore(s => s.increaseItemInCart);
  const items = useCartStore(s => s.items);
  const totalPrice = useTotalPriceSelector();
  const [doughTypes] = useDoughTypes();
  const [sizes] = usePizzaSizes();
  const { isSidebarOpen, closeSidebar } = useCartSidebar();

  return (
    <Sidebar title="Корзина" isOpen={isSidebarOpen} onClose={closeSidebar}>
      <div className="h-full flex flex-col">
        {items.length > 0 ? (
          <>
            <ul className="flex-1 overflow-y-auto">
              {items.map(item => {
                const doughType = doughTypes.find(({ id }) => item.doughTypeId === id);
                const size = sizes.find(({ id }) => item.sizeId === id);

                if (!doughType || !size) {
                  throw new Error('Incorrect item!');
                }

                return (
                  <li key={item.id} className="bg-neutral-100 py-4 px-6 mb-0.5 last:mb-0">
                    <div className="flex items-center">
                      <Image
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        height="100"
                        width="100"
                        className="mr-4"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full">
                          <strong className="font-semibold truncate">{item.pizza.name}</strong>
                          <button
                            className="p-2 rounded-full hover:bg-neutral-100"
                            onClick={() => removeItemFromCart(item)}>
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex">
                          <div className="flex flex-col">
                            <span>Тесто - {doughType.title}</span>
                            <span>Размер - {size.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center ml-2 mt-2 -mb-2">
                      <strong className="font-semibold">{item.price * item.count} руб.</strong>

                      <div className="flex items-center -mr-2">
                        <button
                          className="p-2 rounded-full hover:bg-neutral-100"
                          onClick={() => decreaseItemInCart(item)}>
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="mx-2">{item.count}</span>
                        <button
                          className="p-2 rounded-full hover:bg-neutral-100"
                          onClick={() => increaseItemInCart(item)}>
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className={`${paddingClass} flex flex-col`}>
              <div className="flex items-center justify-between font-semibold text-lg my-4">
                <p>Всего</p>
                <p>{totalPrice} руб</p>
              </div>

              <GoToCartButton />
            </div>
          </>
        ) : (
          <>
            <EmptyCart className={paddingClass} />
            <GoToCartButton />
          </>
        )}
      </div>
    </Sidebar>
  );
}
