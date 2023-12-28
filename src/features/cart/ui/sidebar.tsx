import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

import { usePizzaContext } from '@/entities/pizza';

import { useCartContext } from '../context';

interface CartSidebarProps {
  isOpen: boolean;
  onClose(): void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, increaseItemInCart, decreaseItemInCart, removeItemFromCard, totalPrice } =
    useCartContext();
  const { doughTypes, sizes } = usePizzaContext();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                    <div className="absolute -left-4 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white p-2"
                        onClick={onClose}>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full px-6 flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    <Dialog.Title className="text-xl font-semibold leading-6 text-gray-900">
                      Корзина
                    </Dialog.Title>
                    <ul className="flex-1 overflow-y-auto">
                      {items.map(item => {
                        const doughType = doughTypes.find(({ id }) => item.doughTypeId === id);
                        const size = sizes.find(({ id }) => item.sizeId === id);

                        if (!doughType || !size) {
                          throw new Error('Incorrect item!');
                        }

                        return (
                          <li key={item.id} className="border-b-2 border-neutral-100 p-4">
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
                                    onClick={() => removeItemFromCard(item)}>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
