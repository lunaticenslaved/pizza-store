'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import { ClassNameProp } from '@/shared/types';
import { Input } from '@/shared/ui/input';

import { useSearchStore } from '../store';

export function SearchInput({ className }: ClassNameProp) {
  const { query, setQuery } = useSearchStore();

  return (
    <Input
      className={className}
      prepend={<MagnifyingGlassIcon className="w-4 h-4" />}
      name="price"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Поиск"
      id="price"
      clearable
    />
  );
}
