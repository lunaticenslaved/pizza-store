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

export interface PizzaPriceFilter {
  sizeId?: string;
  priceFrom?: number;
  priceTo?: number;
}

export interface PizzaFilters {
  tag?: PizzaTag;
  prices: PizzaPriceFilter[];
}
