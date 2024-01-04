import { PizzaDoughType } from '@/entities/pizza';
import { Pizza, PizzaSize, PizzaTag } from '@/entities/pizza/types';

export interface PageData {
  doughTypes: PizzaDoughType[];
  sizes: PizzaSize[];
  tags: PizzaTag[];
  pizzas: Pizza[];
}

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
