import { PizzaDoughType } from '@/entities/pizza';
import { Pizza, PizzaSize, PizzaTag } from '@/entities/pizza/types';
import { ADMIN_API } from '@/shared/constants';

export interface PizzaData {
  doughTypes: PizzaDoughType[];
  sizes: PizzaSize[];
  tags: PizzaTag[];
  pizzas: Pizza[];
}

export async function getPizzaData(): Promise<PizzaData> {
  const doughTypes = await import('@/public/data/pizza-dough-types.json').then(
    ({ default: arr }) => arr,
  );
  const sizes = await import('@/public/data/pizza-sizes.json').then(({ default: arr }) => arr);
  const tags = await import('@/public/data/pizza-tags.json').then(({ default: arr }) => arr);

  const pizzas = await getPizzaList();

  return {
    pizzas,
    doughTypes,
    sizes,
    tags,
  };
}

export async function getPizzaList(): Promise<Pizza[]> {
  const response = await fetch(`${ADMIN_API}/pizzas`);
  return response.json();
}
