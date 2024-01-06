import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

import { Input } from '@/shared/ui/input';

interface PizzaSearchProps {
  className?: string;
  value: string;
  onChange(value: string): void;
}

export function PizzaSearch({ value, onChange, className }: PizzaSearchProps) {
  return (
    <div className={classNames('relative rounded-md shadow-sm', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="w-4 h-4" />
      </div>
      <Input name="price" value={value} onChange={onChange} placeholder="Поиск" id="price" />
    </div>
  );
}
