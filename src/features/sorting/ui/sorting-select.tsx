'use client';

import { RiArrowDownSLine } from 'react-icons/ri';

import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';

import { cn } from '@/shared/lib';
import { ClassNameProp } from '@/shared/types';

import { SORTING_ITEMS } from '../constants';
import { useSortingStore } from '../store';

export function SortingSelect({ className }: ClassNameProp) {
  const { key, direction, setSorting } = useSortingStore();

  const selectedSorting = SORTING_ITEMS.find(
    sorting => sorting.key === key && sorting.direction === direction,
  );

  return (
    <Menu as="div" className={classNames('relative inline-block text-left', className)}>
      {({ open }) => {
        return (
          <>
            <Menu.Button className="group inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-neutral-900">
              <RiArrowDownSLine
                className={cn(
                  'mb-1 -mr-1 h-5 w-5 text-black transition-transform',
                  open ? 'rotate-180' : '',
                )}
                aria-hidden="true"
              />
              Сортировать{' '}
              <span className="inline-block text-orange-500 transition-all group-hover:border-b-2 border-orange-500 border-dashed">
                {selectedSorting?.title.toLowerCase()}
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
                  {SORTING_ITEMS.map(sorting => {
                    const { title, id } = sorting;

                    return (
                      <Menu.Item key={id}>
                        {({ active }) => (
                          <li
                            onClick={() => setSorting(sorting)}
                            role="button"
                            className={classNames(
                              active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700',
                              'block px-4 py-2 text-sm cursor-pointer',
                            )}>
                            {title}
                          </li>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </>
        );
      }}
    </Menu>
  );
}
