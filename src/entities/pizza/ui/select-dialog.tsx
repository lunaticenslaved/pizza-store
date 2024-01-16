'use client';

import { Fragment, useMemo, useRef, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';

import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';

import { Button } from '@/shared/ui/button';

import { Pizza } from '../types';

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

  const { sizes, doughTypes } = useMemo(
    () => ({
      sizes: pizza.prices.map(({ size }) => size),
      doughTypes: pizza.doughTypes,
    }),
    [pizza.doughTypes, pizza.prices],
  );

  const [doughTypeId, setDoughTypeId] = useState(doughTypes[0].id);
  const [sizeId, setSizeId] = useState(sizes[0].id);

  const price = useMemo(
    () => pizza.prices.find(({ size }) => size.id === sizeId)?.rub || 0,
    [pizza.prices, sizeId],
  );

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
                <div className="flex flex-col items-center md:flex-row h-full gap-x-6">
                  <Image
                    src={pizza.image.link}
                    alt={pizza.name}
                    height="400"
                    width="400"
                    className="min-w-72 md:w-full hidden sm:block aspect-square object-cover"
                  />
                  <div className="sm:min-w-96 flex flex-col h-full self-stretch overflow-y-auto">
                    <Dialog.Title as="div" className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold leading-6 text-gray-900">Выберите питсу</h3>

                      <button
                        className="rounded-full transition-all hover:bg-neutral-100 p-2"
                        onClick={onClose}>
                        <RiCloseFill className="w-4 h-4" />
                      </button>
                    </Dialog.Title>

                    <div className="flex-1 overflow-y-auto">
                      <Image
                        src={pizza.image.link}
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
                        {sizes.map(({ id, title }) => (
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

                    <Button onClick={() => onAddClick({ pizza, price, sizeId, doughTypeId })}>
                      В корзину за {price} руб.
                    </Button>
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
