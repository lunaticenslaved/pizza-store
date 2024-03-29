'use client';

import { useCallback, useMemo } from 'react';
import { RiAddLine, RiShoppingCartLine } from 'react-icons/ri';

import classNames from 'classnames';
import Image from 'next/image';

import { Button } from '@/shared/ui/button';

import { Pizza } from '../types';
import { getMinimumPizzaPrice } from '../utils';

interface PizzaSelectBlockProps {
  pizza: Pizza;
  className?: string;
  count: number;
  onAddClick(pizza: Pizza): void;
}

export function PizzaSelectBlock({
  pizza,
  className,
  count,
  onAddClick: onAddClickProp,
}: PizzaSelectBlockProps) {
  const minPrice = useMemo(() => getMinimumPizzaPrice(pizza), [pizza]);
  const onAddClick = useCallback(() => onAddClickProp(pizza), [onAddClickProp, pizza]);

  return (
    <div className={classNames('flex flex-col items-center min-w-64', className)}>
      <Image
        height="200"
        width="200"
        className="aspect-square object-cover"
        src={pizza.image.link}
        alt={pizza.title}
      />
      <div className="flex justify-center items-center">
        <h4 className="m-0 my-4 font-bold">{pizza.title}</h4>
        {count > 0 && (
          <span className="flex items-center justify-center ml-2 font-semibold">
            <RiShoppingCartLine className="h-4 w-4 mr-1" />
            {count}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center w-full mb-4 min-h-12">
        <strong className="font-bold text-xl">от {minPrice} ₽</strong>

        <Button onClick={onAddClick} size="sm">
          <RiAddLine className="h-5 w-5" />
          <span className="font-semibold">Добавить</span>
        </Button>
      </div>
    </div>
  );
}
