'use client';

import { useState } from 'react';

import classNames from 'classnames';

const categories = [
  { key: 'all', title: 'Все' },
  { key: 'meat', title: 'Мясные' },
  { key: 'vegetarian', title: 'Вегетарианские' },
  { key: 'grill', title: 'Гриль' },
  { key: 'spicy', title: 'Острые' },
  { key: 'pie', title: 'Закрытые' },
];

interface PizzaCategoriesProps {
  className?: string;
}

export function PizzaCategories({ className }: PizzaCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].key);

  return (
    <ul className={classNames('flex align-items', className)}>
      {categories.map(({ title, key }) => {
        return (
          <li
            key={key}
            className={classNames(
              'px-6 py-4 font-medium rounded-full cursor-pointer transition-all mr-2 last:mr-0',
              {
                'bg-neutral-100 hover:bg-neutral-200': key !== activeCategory,
                'bg-black text-white': key === activeCategory,
              },
            )}
            onClick={() => setActiveCategory(key)}>
            {title}
          </li>
        );
      })}
    </ul>
  );
}
