import { PizzaContextProviderProps } from '@/entities/pizza';

export type PageData = Pick<PizzaContextProviderProps, 'doughTypes' | 'pizzas' | 'sizes' | 'tags'>;

export async function getData(): Promise<PageData> {
  const doughTypes = await import('@/public/data/pizza-dough-types.json').then(
    ({ default: arr }) => arr,
  );
  const sizes = await import('@/public/data/pizza-sizes.json').then(({ default: arr }) => arr);
  const pizzas = await import('@/public/data/pizzas.json').then(({ default: arr }) => arr);
  const tags = await import('@/public/data/pizza-tags.json').then(({ default: arr }) => arr);

  return {
    pizzas,
    doughTypes,
    sizes,
    tags,
  };
}
