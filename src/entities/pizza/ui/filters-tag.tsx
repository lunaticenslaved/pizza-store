'use client';

import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

import { usePizzaTags } from '../store/data';
import { PizzaFilters } from '../types';

interface Category {
  id: string;
  title: string;
}

const ALL: Category = { id: 'all', title: 'Все' };

export function TagFilter() {
  const [tags] = usePizzaTags();
  const { control } = useFormContext<PizzaFilters>();
  const categories = useMemo((): Category[] => [ALL, ...tags], [tags]);

  return (
    <div className="my-2">
      <h6 className="mb-2 font-semibold">Тег</h6>
      <FormField
        control={control}
        name={'tag'}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Размер</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value: string) => {
                  const newTag = categories.find(({ id }) => id === value) || ALL;

                  if (newTag.id === ALL.id) {
                    field.onChange(undefined);
                  } else {
                    field.onChange(newTag);
                  }
                }}
                defaultValue={field.value?.id}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="см" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(({ id, title }) => (
                    <SelectItem key={id} value={id}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
