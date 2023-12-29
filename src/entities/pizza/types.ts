export interface PizzaSize {
  id: string;
  title: string;
}

export interface PizzaTag {
  id: string;
  title: string;
}

export interface PizzaDoughType {
  id: string;
  title: string;
}

export interface PizzaPrice {
  price: number;
  sizeId: string;
}

export interface Pizza {
  id: string;
  image: string;
  name: string;
  prices: PizzaPrice[];
  tags: string[];
}

export type SortingKey = 'price' | 'alphabet';

export interface Sorting {
  id: string;
  key: SortingKey;
  title: string;
  direction: 'asc' | 'desc';
}
