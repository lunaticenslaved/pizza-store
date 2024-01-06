'use client';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

import { PizzaFilter, usePizzaTags } from '@/entities/pizza';
import { ClassNameProp } from '@/shared/types';

import { useFiltersStore } from '../store';

export function ItemsFilter({ className }: ClassNameProp) {
  const { tag, setTag } = useFiltersStore();
  const [tags] = usePizzaTags();

  return (
    <Menu as="div" className={classNames('relative inline-block text-left', className)}>
      {({ open }) => {
        return (
          <>
            <Menu.Button className="group inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-neutral-900">
              {open ? (
                <ChevronUpIcon className="mb-1 -mr-1 h-5 w-5 text-black" aria-hidden="true" />
              ) : (
                <ChevronDownIcon className="mb-1 -mr-1 h-5 w-5 text-black" aria-hidden="true" />
              )}
              Фильтровать{' '}
              <span className="inline-block text-orange-500 transition-all group-hover:border-b-2 border-orange-500 border-dashed">
                {tag?.title.toLowerCase()}
              </span>
            </Menu.Button>

            <Transition
              as="ul"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <PizzaFilter
                    tags={tags}
                    selectedTag={tag}
                    onTagSelect={setTag}
                    className="flex-col"
                  />
                </div>
              </Menu.Items>
            </Transition>
          </>
        );
      }}
    </Menu>
  );
}
