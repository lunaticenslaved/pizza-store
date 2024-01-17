'use client';

import { useMemo, useState } from 'react';

import { DialogTitle } from '@radix-ui/react-dialog';
import classNames from 'classnames';
import Image from 'next/image';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent } from '@/shared/ui/dialog';

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
    <Dialog open={isOpen} onOpenChange={v => !v && onClose()}>
      <DialogContent className="md:flex min-w-[900px]">
        <div className="md:w-[400px] w-full hidden sm:block aspect-square overflow-hidden">
          <Image
            src={pizza.image.link}
            alt={pizza.title}
            width="400"
            height="400"
            className="object-cover h-full w-full"
          />
        </div>

        <div className="sm:min-w-96 flex-1 flex flex-col h-full self-stretch overflow-y-auto">
          <DialogTitle className="flex justify-between items-center mb-4" asChild>
            <h3 className="text-lg font-bold leading-6 text-gray-900">Выберите питсу</h3>
          </DialogTitle>

          <div className="flex-1 overflow-y-auto">
            <Image
              src={pizza.image.link}
              alt={pizza.title}
              fill
              className="w-72 md:w-full sm:hidden mx-auto aspect-square object-cover"
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
      </DialogContent>
    </Dialog>
  );
}
