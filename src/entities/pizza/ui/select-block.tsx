'use client';

import { useCallback, useMemo, useState } from 'react';

import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import Image from 'next/image';

import { usePizzaContext } from '../context';
import { Pizza, PizzaDoughType, PizzaSize } from '../types';

interface ActionData {
  pizza: Pizza;
  doughType: string;
  size: string;
  price: number;
}

interface PizzaSelectBlockProps {
  pizza: Pizza;
  className?: string;
  count: number | ((data: ActionData) => void);
  onAddClick(data: ActionData): void;
  onRemoveClick(data: ActionData): void;
  onIncreaseClick(data: ActionData): void;
  onDecreaseClick(data: ActionData): void;
}

export function PizzaSelectBlock({
  pizza,
  className,
  count: countProp,
  onAddClick: onAddClickProp,
  onRemoveClick: onRemoveClickProp,
  onDecreaseClick: onDecreaseClickProp,
  onIncreaseClick: onIncreaseClickProp,
}: PizzaSelectBlockProps) {
  const { doughTypes, sizes } = usePizzaContext();

  const [doughType, setDoughType] = useState(doughTypes[0].id);
  const [size, setSize] = useState(sizes[0].id);

  const { pizzaSpecificDoughType, pizzaSpecificSizes } = useMemo(() => {
    return pizza.prices.reduce(
      (acc, pizzaPrice) => {
        const curDoughType = doughTypes.find(({ id }) => pizzaPrice.doughTypeId === id);
        const curSize = sizes.find(({ id }) => pizzaPrice.sizeId === id);

        if (curDoughType && !acc.pizzaSpecificDoughType.find(({ id }) => curDoughType.id === id)) {
          acc.pizzaSpecificDoughType.push(curDoughType);
        }

        if (curSize && !acc.pizzaSpecificSizes.find(({ id }) => curSize.id === id)) {
          acc.pizzaSpecificSizes.push(curSize);
        }

        return acc;
      },
      {
        pizzaSpecificDoughType: [] as PizzaDoughType[],
        pizzaSpecificSizes: [] as PizzaSize[],
      },
    );
  }, [doughTypes, pizza.prices, sizes]);

  const { price, priceObject } = useMemo(() => {
    const priceObject = pizza.prices.find(
      pizzaPrice => pizzaPrice.doughTypeId === doughType && pizzaPrice.sizeId === size,
      [],
    );

    return { priceObject, price: priceObject?.price || 0 };
  }, [doughType, pizza.prices, size]);

  const actionData = useMemo(
    (): ActionData => ({ pizza, doughType, size, price }),
    [doughType, pizza, price, size],
  );

  const onAddClick = useCallback(() => onAddClickProp(actionData), [actionData, onAddClickProp]);
  const onRemoveClick = useCallback(
    () => onRemoveClickProp(actionData),
    [actionData, onRemoveClickProp],
  );
  const onDecreaseClick = useCallback(
    () => onDecreaseClickProp(actionData),
    [actionData, onDecreaseClickProp],
  );
  const onIncreaseClick = useCallback(
    () => onIncreaseClickProp(actionData),
    [actionData, onIncreaseClickProp],
  );

  const count = useMemo(() => {
    if (typeof countProp === 'number') {
      return countProp;
    }

    return countProp(actionData);
  }, [actionData, countProp]);

  if (!priceObject) {
    throw new Error('Pizza price not found');
  }

  return (
    <div className={classNames('flex flex-col items-center min-w-64', className)}>
      <Image height="200" width="200" src={pizza.image} alt={pizza.name} />
      <h4 className="m-0 my-4 font-bold">{pizza.name}</h4>
      <div className="bg-neutral-100 p-2 rounded-lg text-sm w-full">
        <ul className="mb-2 flex">
          {pizzaSpecificDoughType.map(({ id, title }) => (
            <li
              key={id}
              role="button"
              onClick={() => setDoughType(id)}
              className={classNames(
                'cursor-pointer p-2 rounded-lg text-center mr-2 last:mr-0 transition-all flex-1',
                { 'bg-white': doughType === id },
              )}>
              {title}
            </li>
          ))}
        </ul>
        <ul className="flex justify-items-stretch">
          {pizzaSpecificSizes.map(({ id, title }) => (
            <li
              key={id}
              role="button"
              onClick={() => setSize(id)}
              className={classNames(
                'cursor-pointer p-2 rounded-lg text-center mr-2 last:mr-0 transition-all flex-1',
                { 'bg-white': id === size },
              )}>
              {title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center w-full my-6 min-h-12">
        <strong className="font-bold text-xl">{price} ₽</strong>

        {!count ? (
          <button
            className="flex items-center border-none transition-all text-orange-500 hover:bg-orange-100/50 border-2 rounded-full px-4 py-3"
            onClick={onAddClick}>
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Добавить</span>
          </button>
        ) : (
          <div className="flex items-center">
            <button
              onClick={onDecreaseClick}
              className="flex items-center border-none text-orange-500 hover:bg-orange-100/50 border-2 rounded-full p-2">
              <MinusIcon className="h-5 w-5" />
            </button>
            <span className="font-bold text-orange-500 mx-2">{count}</span>
            <button
              onClick={onIncreaseClick}
              className="flex items-center border-none text-orange-500 hover:bg-orange-100/50 border-2 rounded-full p-2">
              <PlusIcon className="h-5 w-5" />
            </button>

            <button
              onClick={onRemoveClick}
              className="flex items-center border-none text-orange-500 hover:bg-orange-100/50 border-2 rounded-full p-2 ml-4">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
