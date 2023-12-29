'use client';

import { useMemo } from 'react';

import classNames from 'classnames';

import { PizzaTag } from '../types';

interface Category {
  id: string;
  title: string;
}

interface PizzaFilterProps {
  className?: string;
  tags: PizzaTag[];
  selectedTag?: PizzaTag;
  onTagSelect(value?: PizzaTag): void;
}

const ALL: Category = { id: 'all', title: 'Все' };

export function PizzaFilter({ className, tags, selectedTag = ALL, onTagSelect }: PizzaFilterProps) {
  const categories = useMemo((): Category[] => [ALL, ...tags], [tags]);

  return (
    <ul className={classNames('flex align-items', className)}>
      {categories.map(category => {
        const { title, id } = category;

        return (
          <li
            key={id}
            className={classNames(
              'px-6 py-4 font-medium rounded-full cursor-pointer transition-all mr-2 last:mr-0',
              {
                'bg-neutral-100 hover:bg-neutral-200': id !== selectedTag.id,
                'bg-black text-white': id === selectedTag.id,
              },
            )}
            onClick={() => (id === ALL.id ? onTagSelect(undefined) : onTagSelect(category))}>
            {title}
          </li>
        );
      })}
    </ul>
  );
}
