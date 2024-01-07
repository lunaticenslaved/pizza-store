import { FiltersSidebar } from '@/features/filters';
import { SearchInput } from '@/features/search';
import { SortingSelect } from '@/features/sorting';
import { cn } from '@/shared/lib';
import { ClassNameProp } from '@/shared/types';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { PIZZA_SECTION, ROLLS_SECTION, SUSHI_SECTION } from './constants';

export const NAVBAR_SECTIONS = [PIZZA_SECTION, ROLLS_SECTION, SUSHI_SECTION];

export function TheNavbar({ className }: ClassNameProp) {
  return (
    <nav
      className={cn(
        'flex flex-wrap items-center justify-between border-b border-neutral-200 px-4 pr-6 py-2',
        className,
      )}>
      <Tabs defaultValue={NAVBAR_SECTIONS[0].id} className="w-[400px]">
        <TabsList>
          {NAVBAR_SECTIONS.map(({ title, id }) => (
            <TabsTrigger key={id} value={id} asChild>
              <a href={`#${id}`}>{title}</a>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-center">
        <SearchInput className="h-10" />
        <SortingSelect />
        <FiltersSidebar />
      </div>
    </nav>
  );
}

export { PIZZA_SECTION, SUSHI_SECTION, ROLLS_SECTION } from './constants';
