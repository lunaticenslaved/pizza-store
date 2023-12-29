import { Fragment, useMemo, useRef, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
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
      <Dialog
        as="div"
        className="relative z-[100]"
        initialFocus={cancelButtonRef}
        onClose={onClose}>
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
          <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform sm:rounded-lg bg-white text-left shadow-xl transition-all p-4 sm:p-8 h-[100vh] sm:h-auto w-full sm:w-auto">
                <div className="flex flex-col items-center md:flex-row h-full">
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    height="400"
                    width="400"
                    className="min-w-72 md:w-full hidden sm:block"
                  />
                  <div className="sm:min-w-96 flex flex-col h-full self-stretch overflow-y-auto">
                    <Dialog.Title as="div" className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold leading-6 text-gray-900">Выберите питсу</h3>

                      <button
                        className="rounded-full transition-all hover:bg-neutral-100 p-2"
                        onClick={onClose}>
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </Dialog.Title>

                    <div className="flex-1 overflow-y-auto">
                      <Image
                        src={pizza.image}
                        alt={pizza.name}
                        height="400"
                        width="400"
                        className="w-72 md:w-full sm:hidden mx-auto"
                      />

                      <h6 className="font-semibold mb-2">Тесто</h6>
                      <ul className="justify-items-stretch mb-2 flex bg-neutral-100 p-2 rounded-lg text-sm w-full flex-col sm:flex-row">
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

                      <h6 className="font-semibold mb-2 mt-4">Размер</h6>
                      <ul className="justify-items-stretch mb-2 flex bg-neutral-100 p-2 rounded-lg text-sm w-full flex-col sm:flex-row">
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
