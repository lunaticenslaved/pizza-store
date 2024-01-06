import { ItemsFilter } from '@/features/filters';
import { SearchInput } from '@/features/search';
import { SortingSelect } from '@/features/sorting';

const items = [
  {
    title: 'Пицца',
  },
  {
    title: 'Суши',
  },
  {
    title: 'Роллы',
  },
];

export function TheNavbar() {
  return (
    <nav className="flex items-center justify-between border-b border-neutral-200 px-4 pr-6">
      <div className="flex items-center justify-start">
        {items.map(({ title }) => (
          <div key={title} className="flex items-center justify-center py-4 px-6">
            {title}
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <SearchInput className="h-10" />
        <SortingSelect />
        <ItemsFilter />
      </div>
    </nav>
  );
}
