'use client';

import { useCallback, useMemo } from 'react';

import { PlusIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import orderBy from 'lodash/orderBy';
import Image from 'next/image';

import { Pizza } from '../types';

interface PizzaSelectBlockProps {
  pizza: Pizza;
  className?: string;
  count: number;
  onAddClick(pizza: Pizza): void;
  onRemoveClick(pizza: Pizza): void;
}

export function PizzaSelectBlock({
  pizza,
  className,
  count,
  onAddClick: onAddClickProp,
}: PizzaSelectBlockProps) {
  const minPrice = useMemo(() => {
    const priceObject = orderBy(pizza.prices, price => price.price, 'asc')[0];
    return priceObject?.price;
  }, [pizza.prices]);

  const onAddClick = useCallback(() => onAddClickProp(pizza), [onAddClickProp, pizza]);

  if (!minPrice) {
    throw new Error('Pizza min price not found');
  }

  return (
    <div className={classNames('flex flex-col items-center min-w-64', className)}>
      <Image height="200" width="200" src={pizza.image} alt={pizza.name} />
      <div className="flex justify-center items-center">
        <h4 className="m-0 my-4 font-bold">{pizza.name}</h4>
        {count > 0 && (
          <span className="flex items-center justify-center ml-2 font-semibold">
            <ShoppingCartIcon className="h-4 w-4 mr-1" />
            {count}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center w-full mb-4 min-h-12">
        <strong className="font-bold text-xl">от {minPrice} ₽</strong>

        <button
          className="flex items-center border-none transition-all bg-orange-500 text-white hover:bg-orange-600 border-2 rounded-full px-4 py-2"
          onClick={onAddClick}>
          <PlusIcon className="h-5 w-5" />
          <span className="font-semibold">Добавить</span>
        </button>
      </div>
    </div>
  );
}
