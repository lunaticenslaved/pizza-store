export type SortingKey = 'price' | 'alphabet';
export type SortingDirection = 'asc' | 'desc';

export interface Sorting {
  id: string;
  title: string;
  key: SortingKey;
  direction: SortingDirection;
}
