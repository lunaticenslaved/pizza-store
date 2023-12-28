export interface PizzaSize {
  id: string;
  title: string;
}

export interface PizzaDoughType {
  id: string;
  title: string;
}

export interface PizzaPrice {
  price: number;
  doughTypeId: string;
  sizeId: string;
}

export interface Pizza {
  id: string;
  image: string;
  name: string;
  prices: PizzaPrice[];
}
