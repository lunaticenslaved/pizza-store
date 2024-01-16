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
  image: {
    link: string;
  };
  title: string;
  prices: Array<{
    id: string;
    title: string;
    rub: number;
    size: {
      id: string;
      title: string;
    };
  }>;
  doughTypes: Array<{
    id: string;
    title: string;
  }>;
  tags: Array<{
    id: string;
    title: string;
  }>;
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
