'use client';

import { useEffect, useState } from 'react';
import { RiAddLine, RiCloseFill, RiSubtractLine } from 'react-icons/ri';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/shared/ui/sidebar';

import { useCartStore, useTotalPriceSelector } from '../store';

import { EmptyCart } from './empty';
import { GoToCartButton } from './go-to-cart-button';
import { CartSidebarButton } from './sidebar-button';

const paddingClass = 'px-6';

export function CartSidebar() {
  const removeItemFromCart = useCartStore(s => s.removeItemFromCart);
  const decreaseItemInCart = useCartStore(s => s.decreaseItemInCart);
  const increaseItemInCart = useCartStore(s => s.increaseItemInCart);
  const items = useCartStore(s => s.items);
  const totalPrice = useTotalPriceSelector();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const pathname = usePathname();

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <CartSidebarButton onClick={openSidebar} />
      <Sidebar title="Корзина" isOpen={isSidebarOpen} onClose={closeSidebar}>
        <div className="h-full flex flex-col">
          {items.length > 0 ? (
            <>
              <ul className="flex-1 overflow-y-auto">
                {items.map(item => {
                  const doughType = item.pizza.doughTypes.find(dt => dt.id === item.doughTypeId);
                  const size = item.pizza.prices.find(p => p.size.id === item.sizeId)?.size;

                  if (!doughType || !size) {
                    throw new Error('Incorrect item!');
                  }

                  return (
                    <li key={item.id} className="bg-neutral-100 py-4 px-4 mb-0.5 last:mb-0">
                      <div className="flex items-center">
                        <Image
                          src={item.pizza.image.link}
                          alt={item.pizza.title}
                          height="100"
                          width="100"
                          className="mr-4 aspect-square object-cover"
                        />
                        <div className="w-full self-start flex flex-col">
                          <div className="flex items-center justify-between w-full">
                            <strong className="font-semibold truncate">{item.pizza.title}</strong>
                            <button
                              className="p-2 rounded-full hover:bg-neutral-100"
                              onClick={() => removeItemFromCart(item)}>
                              <RiCloseFill className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex flex-col">
                            <span>Тесто - {doughType.title}</span>
                            <span>Размер - {size.title}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center ml-2 mt-2 -mb-2">
                        <strong className="font-semibold">{item.price * item.count} руб.</strong>

                        <div className="flex items-center -mr-2">
                          <button
                            className="p-2 rounded-full hover:bg-neutral-100"
                            onClick={() => decreaseItemInCart(item)}>
                            <RiSubtractLine className="h-4 w-4" />
                          </button>
                          <span className="mx-2">{item.count}</span>
                          <button
                            className="p-2 rounded-full hover:bg-neutral-100"
                            onClick={() => increaseItemInCart(item)}>
                            <RiAddLine className="h-4 w-4" />
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
    </>
  );
}
