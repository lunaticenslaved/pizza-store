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
  const tags = await getPizzaTags();
  const pizzas = await getPizzaList();
  const doughTypes = await getPizzaDoughTypes();
  const sizes = await getPizzaSizes();

  return {
    pizzas,
    doughTypes,
    sizes,
    tags,
  };
}

export async function getPizzaList(): Promise<Pizza[]> {
  const response = await fetch(`${ADMIN_API}/pizza`);
  return response.json();
}

export async function getPizzaDoughTypes(): Promise<PizzaDoughType[]> {
  const response = await fetch(`${ADMIN_API}/pizza/dough-types`);
  return response.json();
}

export async function getPizzaSizes(): Promise<PizzaSize[]> {
  const response = await fetch(`${ADMIN_API}/pizza/sizes`);
  return response.json();
}

export async function getPizzaTags(): Promise<PizzaSize[]> {
  const response = await fetch(`${ADMIN_API}/pizza/tags`);
  return response.json();
}
