import { Fragment, useMemo, useRef, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';

import { usePizzaContext } from '../context';
import { Pizza, PizzaSize } from '../types';

interface AddPizzaData {
  pizza: Pizza;
  sizeId: string;
  doughTypeId: string;
  price: number;
}

export interface PizzaSelectDialogProps {
  pizza: Pizza;
  isOpen: boolean;
  onClose(): void;
  onAddClick(data: AddPizzaData): void;
}

export function PizzaSelectDialog({ isOpen, onClose, pizza, onAddClick }: PizzaSelectDialogProps) {
  const cancelButtonRef = useRef(null);
  const { doughTypes, sizes } = usePizzaContext();
  const [doughTypeId, setDoughTypeId] = useState(doughTypes[0].id);

  const pizzaSizes = useMemo(() => {
    const arr: Array<PizzaSize & { price: number }> = [];

    for (const pizzaPrice of pizza.prices) {
      const size = sizes.find(({ id }) => pizzaPrice.sizeId === id);

      if (!size) continue;

      arr.push({ ...size, price: pizzaPrice.price });
    }

    return arr;
  }, [pizza.prices, sizes]);

  const [sizeId, setSizeId] = useState(pizzaSizes[0].id);

  const price = useMemo(() => {
    const obj = pizzaSizes.find(({ id }) => sizeId === id);

    if (!obj) {
      throw new Error('Price not found');
    }

    return obj.price;
  }, [pizzaSizes, sizeId]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all p-8 ">
                <div className="flex">
                  <Image src={pizza.image} alt={pizza.name} height="400" width="400" />
                  <div className="min-w-96 flex flex-col">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 mb-4">
                      Выберите питсу
                    </Dialog.Title>

                    <div className="flex-1">
                      <div className="bg-neutral-100 p-2 rounded-lg text-sm w-full ">
                        <ul className="mb-2 flex">
                          {doughTypes.map(({ id, title }) => (
                            <li
                              key={id}
                              role="button"
                              onClick={() => setDoughTypeId(id)}
                              className={classNames(
                                'cursor-pointer p-2 rounded-lg text-center mr-2 last:mr-0 transition-all flex-1',
                                { 'bg-white': doughTypeId === id },
                              )}>
                              {title}
                            </li>
                          ))}
                        </ul>
                        <ul className="flex justify-items-stretch">
                          {pizzaSizes.map(({ id, title }) => (
                            <li
                              key={id}
                              role="button"
                              onClick={() => setSizeId(id)}
                              className={classNames(
                                'cursor-pointer p-2 rounded-lg text-center mr-2 last:mr-0 transition-all flex-1',
                                { 'bg-white': id === sizeId },
                              )}>
                              {title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      className="text-center w-full p-4 rounded-full bg-orange-500 font-semibold text-white mt-4"
                      onClick={() => onAddClick({ pizza, price, sizeId, doughTypeId })}>
                      В корзину за {price} руб.
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
