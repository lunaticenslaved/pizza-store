import { useFieldArray, useFormContext } from 'react-hook-form';
import { RiCloseFill } from 'react-icons/ri';

import { Button } from '@/shared/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { usePizzaSizes } from '../store/data';
import { PizzaFilters } from '../types';

export function PriceFilter() {
  const [sizes] = usePizzaSizes();
  const { control } = useFormContext<PizzaFilters>();
  const { fields, update } = useFieldArray({
    control,
    name: 'prices',
    keyName: 'id',
  });

  return (
    <>
      <h6 className="mb-2 font-semibold mt-6">Цена</h6>
      {fields.map((field, idx) => (
        <div key={field.id} className="flex mb-2 gap-x-2 max-w-full">
          <div className="self-stretch flex flex-col items-center justify-center mr-2 max-w-12 w-12">
            <p className={idx === 0 ? 'mt-8' : ''}>
              {sizes.find(size => size.id === field.sizeId)?.title}
            </p>
          </div>
          <FormField
            control={control}
            name={`prices.${idx}.priceFrom`}
            render={({ field }) => (
              <FormItem className="flex-1 min-w-0">
                {idx === 0 && <FormLabel>От, руб.</FormLabel>}
                <FormControl>
                  <Input {...field} type="number" clearable />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`prices.${idx}.priceTo`}
            render={({ field }) => (
              <FormItem className="flex-1 min-w-0">
                {idx === 0 && <FormLabel>До, руб.</FormLabel>}
                <FormControl>
                  <Input {...field} type="number" clearable />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="ghost"
            size="sm"
            className={idx === 0 ? 'mt-11' : 'self-center'}
            onClick={() =>
              update(idx, {
                sizeId: field.sizeId,
                priceFrom: undefined,
                priceTo: undefined,
              })
            }>
            <RiCloseFill className="h-6 w-6" />
          </Button>
        </div>
      ))}
    </>
  );
}
