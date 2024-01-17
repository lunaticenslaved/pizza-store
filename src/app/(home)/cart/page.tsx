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

import {
  EmptyCart,
  GoToCartPaymentButton,
  useCartItemsState,
  useCartStore,
  useItemsInCartCountSelector,
  useTotalPriceSelector,
} from '@/features/cart';
import { Button } from '@/shared/ui/button';

export default function Page() {
  const [items] = useCartItemsState();
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
                const doughType = item.pizza.doughTypes.find(({ id }) => id === item.doughTypeId);
                const size = item.pizza.prices.find(({ size }) => size.id === item.sizeId)?.size;

                if (!size || !doughType) {
                  throw new Error('Item not valid');
                }

                return (
                  <li key={item.id} className="flex items-center flex-wrap">
                    <Image
                      src={item.pizza.image.link}
                      alt={item.pizza.title}
                      height="100"
                      width="100"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-bold text-lg">{item.pizza.title}</p>
                      <p>
                        {doughType?.title}, {size?.title}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 ml-8">
                      <div className="flex items-center">
                        <Button size="sm" variant="ghost" onClick={() => decreaseItemInCart(item)}>
                          <RiSubtractLine className="h-4 w-4" />
                        </Button>
                        <span className="mx-4 font-bold">{item.count}</span>
                        <Button onClick={() => increaseItemInCart(item)} variant="ghost" size="sm">
                          <RiAddLine className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mx-8 font-bold text-xl">{item.count * item.price} руб.</p>
                      <Button variant="outline" onClick={() => removeItemFromCart(item)}>
                        <RiCloseFill className="h-4 w-4" />
                      </Button>
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
