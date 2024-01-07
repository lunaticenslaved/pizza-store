'use client';

import {
  RiAddLine,
  RiArrowLeftSLine,
  RiCloseFill,
  RiDeleteBin6Line,
  RiShoppingCartLine,
  RiSubtractLine,
} from 'react-icons/ri';

import Image from 'next/image';
import Link from 'next/link';

import { useDoughTypes, usePizzaSizes } from '@/entities/pizza';
import {
  EmptyCart,
  GoToCartPaymentButton,
  useCartStore,
  useItemsInCartCountSelector,
  useItemsSelector,
  useTotalPriceSelector,
} from '@/features/cart';
import { Button } from '@/shared/ui/button';

export default function Page() {
  const items = useItemsSelector();
  const [doughTypes] = useDoughTypes();
  const [sizes] = usePizzaSizes();
  const itemsCount = useItemsInCartCountSelector();
  const totalPrice = useTotalPriceSelector();
  const clearCart = useCartStore(s => s.clearCart);
  const removeItemFromCart = useCartStore(s => s.removeItemFromCart);
  const increaseItemInCart = useCartStore(s => s.increaseItemInCart);
  const decreaseItemInCart = useCartStore(s => s.decreaseItemInCart);

  const notEmptyCart = !!items.length;

  return (
    <>
      <div className="px-12">
        <div className="flex items-center justify-between mt-8 sm:mt-16 border-b-2 border-neutral-100 pb-2">
          <div className="flex items-center">
            <RiShoppingCartLine className="h-8 w-8 mb-1 mr-2" />
            <h2 className="text-xl font-bold">Корзина</h2>
          </div>

          {!!notEmptyCart && (
            <Button variant="ghost" onClick={clearCart}>
              <RiDeleteBin6Line className="w-4 h-4" />
              Очистить корзину
            </Button>
          )}
        </div>
        {notEmptyCart ? (
          <>
            <ul className="my-12">
              {items.map(item => {
                const doughType = doughTypes.find(({ id }) => id === item.doughTypeId);
                const size = sizes.find(({ id }) => id === item.sizeId);

                return (
                  <li key={item.id} className="flex items-center flex-wrap">
                    <Image src={item.pizza.image} alt={item.pizza.name} height="100" width="100" />
                    <div className="ml-4 flex-1">
                      <p className="font-bold text-lg">{item.pizza.name}</p>
                      <p>
                        {doughType?.title}, {size?.title}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 ml-8">
                      <div className="flex items-center">
                        <button
                          onClick={() => decreaseItemInCart(item)}
                          className="text-orange-500 rounded-full border-2 border-orange-500 p-1 hover:bg-orange-50 transition-all">
                          <RiSubtractLine className="h-4 w-4" />
                        </button>
                        <span className="mx-4 font-bold text-orange-500">{item.count}</span>
                        <button
                          onClick={() => increaseItemInCart(item)}
                          className="text-orange-500 rounded-full border-2 border-orange-500 p-1 hover:bg-orange-50 transition-all">
                          <RiAddLine className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mx-8 font-bold text-xl">{item.count * item.price} руб.</p>
                      <button
                        onClick={() => removeItemFromCart(item)}
                        className="text-neutral-300 border-2 border-neutral-300 p-1 rounded-full">
                        <RiCloseFill className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="text-xl flex justify-between my-8 flex-col sm:flex-row sm:items-center">
              <p>
                Всего пицц: <span className="font-bold">{itemsCount}</span>
              </p>
              <p>
                Сумма заказа: <span className="font-bold text-orange-500">{totalPrice}</span>
              </p>
            </div>
          </>
        ) : (
          <EmptyCart className="my-16" />
        )}

        <div className="flex justify-between flex-col sm:flex-row">
          <Button asChild variant="outline">
            <Link href="/">
              <RiArrowLeftSLine className="w-6 h-6 mr-2" />
              Вернуться к еде
            </Link>
          </Button>

          {itemsCount > 0 && <GoToCartPaymentButton />}
        </div>
      </div>
    </>
  );
}
