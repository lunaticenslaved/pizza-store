import orderBy from 'lodash/orderBy';

import { Pizza } from './types';

export function getMinimumPizzaPrice(pizza: Pizza) {
  return orderBy(pizza.prices, price => price.price, 'asc')[0].price;
}
