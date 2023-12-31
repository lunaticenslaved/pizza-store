'use client';

import { RiSearchLine } from 'react-icons/ri';

import { ClassNameProp } from '@/shared/types';
import { Input } from '@/shared/ui/input';

import { useSearchStore } from '../store';

export function SearchInput({ className }: ClassNameProp) {
  const { query, setQuery } = useSearchStore();

  return (
    <Input
      className={className}
      prepend={<RiSearchLine className="w-4 h-4" />}
      name="price"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Поиск"
      id="price"
      clearable
    />
  );
}
