import { useMemo } from 'react';

import { Pizza, PizzaFilters, PizzaPriceFilter, PizzaTag } from '../types';

const filterByTag = (pizza: Pizza, tag: PizzaTag) => pizza.tags.some(({ id }) => id === tag.id);
const filterByPrice = (pizza: Pizza, priceFilters: PizzaPriceFilter[]) => {
  for (const priceFilter of priceFilters) {
    const { sizeId, priceFrom, priceTo } = priceFilter;

    if (!priceFrom && !priceTo) continue;

    const pizzaPrice = pizza.prices.find(price => price.size.id === sizeId);

    if (!pizzaPrice) continue;

    if (priceFrom && priceTo) {
      if (pizzaPrice.rub >= priceFrom && pizzaPrice.rub <= priceTo) {
        return true;
      }

      continue;
    } else if (priceFrom) {
      if (pizzaPrice.rub >= priceFrom) {
        return true;
      }

      continue;
    } else if (priceTo) {
      if (pizzaPrice.rub <= priceTo) {
        return true;
      }

      continue;
    }
  }

  return false;
};

export function useFilteredPizza(filters: PizzaFilters, pizzas: Pizza[]): Pizza[] {
  const { tag, prices } = filters;

  const filteredItems = useMemo(() => {
    const hasTag = !!tag;
    const hasPrices = prices.some(
      ({ priceFrom, priceTo }) => (!!priceFrom && priceFrom > 0) || (!!priceTo && priceTo > 0),
    );

    const hasFilters = hasTag || hasPrices;

    if (!hasFilters) return pizzas;

    return pizzas.filter(
      pizza => (!hasTag || filterByTag(pizza, tag)) && (!hasPrices || filterByPrice(pizza, prices)),
    );
  }, [pizzas, prices, tag]);

  return filteredItems;
}
