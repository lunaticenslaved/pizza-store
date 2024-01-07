import { RiShoppingCart2Line } from 'react-icons/ri';

import { Button } from '@/shared/ui/button';

import { useItemsInCartCountSelector, useTotalPriceSelector } from '../store';

interface CartSidebarButtonProps {
  onClick(): void;
}

export function CartSidebarButton({ onClick }: CartSidebarButtonProps) {
  const totalPrice = useTotalPriceSelector();
  const itemsInCartCount = useItemsInCartCountSelector();

  return (
    <Button onClick={onClick}>
      <span>{totalPrice} ₽</span>

      <div className="border-r-2 border-orange-400 opacity-50 mx-2 sm:mx-4 hidden sm:block"></div>

      <div className="items-center min-w-12 justify-center hidden sm:flex">
        <RiShoppingCart2Line className="h-4 w-4 mb-1 mr-2" />
        <span>{itemsInCartCount}</span>
      </div>
    </Button>
  );
}
