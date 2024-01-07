'use client';

import { PropsWithChildren, useEffect } from 'react';

import { PizzaData, useDoughTypes, usePizzaSizes, usePizzaTags, usePizzas } from '@/entities/pizza';

interface DataKeeperProps extends PropsWithChildren, PizzaData {}

export function DataKeeper({ tags, doughTypes, sizes, pizzas, children }: DataKeeperProps) {
  const [_1, setDoughTypes] = useDoughTypes();
  const [_2, setPizzaSizes] = usePizzaSizes();
  const [_3, setPizzaTags] = usePizzaTags();
  const [_4, setPizzas] = usePizzas();

  useEffect(() => {
    setPizzaSizes(sizes);
    setDoughTypes(doughTypes);
    setPizzaTags(tags);
    setPizzas(pizzas);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
