import orderBy from 'lodash/orderBy';

import { Pizza } from './types';

export function getMinimumPizzaPrice(pizza: Pizza) {
  return orderBy(pizza.prices, price => price.rub, 'asc')[0].rub;
}
