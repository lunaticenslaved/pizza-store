import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

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
      <input
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        type="text"
        name="price"
        id="price"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
        placeholder="Поиск"
      />
    </div>
  );
}
