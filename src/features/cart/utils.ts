import { InCartItem } from './types';

export function saveItemsInStorage({ items }: { items: InCartItem[] }): { items: InCartItem[] } {
  localStorage.setItem('cart_items', JSON.stringify(items));

  return { items };
}

export function getItemsFromStorage(): InCartItem[] {
  try {
    return JSON.parse(localStorage.getItem('cart_items') || '[]');
  } catch {
    return [];
  }
}
