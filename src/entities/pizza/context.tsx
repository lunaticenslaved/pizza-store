import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';

import { Pizza, PizzaDoughType, PizzaSize } from './types';

interface IPizzaContext {
  doughTypes: PizzaDoughType[];
  sizes: PizzaSize[];
  pizzas: Pizza[];
  isLoading: boolean;
}

const Context = createContext<IPizzaContext | null>(null);

export function PizzaContextProvider({ children }: PropsWithChildren) {
  const doughTypes = useQuery('pizza/dough-types', () =>
    import('@/public/data/pizza-dough-types.json').then(({ default: array }) => array),
  );
  const sizes = useQuery('pizza/sizes', () =>
    import('@/public/data/pizza-sizes.json').then(({ default: array }) => array),
  );
  const pizzas = useQuery('pizza/pizzas', () =>
    import('@/public/data/pizzas.json').then(({ default: array }) => array),
  );

  const value: IPizzaContext = useMemo(
    () => ({
      doughTypes: doughTypes.data || [],
      sizes: sizes.data || [],
      pizzas: pizzas.data || [],
      isLoading: doughTypes.isLoading || sizes.isLoading || pizzas.isLoading,
    }),
    [
      doughTypes.data,
      doughTypes.isLoading,
      pizzas.data,
      pizzas.isLoading,
      sizes.data,
      sizes.isLoading,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function usePizzaContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Pizza context not found!');
  }

  return context;
}
