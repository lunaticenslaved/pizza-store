'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { throttle } from 'lodash';

import { usePizzaSizes } from '@/entities/pizza';
import { Form } from '@/shared/ui/form';

import { usePizzaFiltersStore } from '../store/filters';
import { PizzaFilters as FormValues } from '../types';

import { PriceFilter } from './filters-price';
import { TagFilter } from './filters-tag';

export function PizzaFilters() {
  const { setFilters } = usePizzaFiltersStore();
  const [sizes] = usePizzaSizes();
  const form = useForm<FormValues>({
    defaultValues: {
      tag: undefined,
      prices: sizes.map(size => ({ sizeId: size.id, priceFrom: undefined, priceTo: undefined })),
    },
  });
  const { handleSubmit, watch } = form;

  useEffect(() => {
    const fn = throttle((values: FormValues) => {
      setFilters(values);
    }, 500);
    const subscription = watch(values => fn(values as FormValues));
    return () => subscription.unsubscribe();
  }, [setFilters, watch]);

  return (
    <Form {...form}>
      <form className="mt-4" onSubmit={handleSubmit(() => null)}>
        <TagFilter />
        <PriceFilter />
      </form>
    </Form>
  );
}
