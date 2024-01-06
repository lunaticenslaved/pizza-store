'use client';

import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

import { useDoughTypes, usePizzaSizes } from '@/entities/pizza';

import { useCartSidebar } from '../hooks/use-sidebar';
import { useCartStore, useTotalPriceSelector } from '../store';

import { EmptyCart } from './empty';

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
    <Transition.Root show={isSidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeSidebar}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex sm:max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="hidden sm:flex absolute -left-4 top-0 -ml-8 pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-full text-gray-30 focus:outline-none focus:ring-2 focus:ring-white p-2"
                        onClick={closeSidebar}>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <Dialog.Title
                        className={`text-xl ${paddingClass} font-semibold leading-6 text-gray-900`}>
                        Корзина
                      </Dialog.Title>
                      <button
                        type="button"
                        className="block sm:hidden relative rounded-full text-gray-30 focus:outline-none focus:ring-2 focus:ring-white p-2 mr-4"
                        onClick={closeSidebar}>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

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
                              <li
                                key={item.id}
                                className="bg-neutral-100 py-4 px-6 mb-0.5 last:mb-0">
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
                                      <strong className="font-semibold truncate">
                                        {item.pizza.name}
                                      </strong>
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
                                  <strong className="font-semibold">
                                    {item.price * item.count} руб.
                                  </strong>

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

                          <Link
                            href="/cart"
                            className="text-center p-4 bg-orange-500 text-white font-semibold rounded-full">
                            Перейти к оформлению
                          </Link>
                        </div>
                      </>
                    ) : (
                      <EmptyCart className={paddingClass} />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
