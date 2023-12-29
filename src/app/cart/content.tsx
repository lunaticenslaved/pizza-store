'use client';

import { ChevronLeftIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

import { useDoughTypes, usePizzaSizes } from '@/entities/pizza';
import {
  EmptyCart,
  useCartStore,
  useItemsInCartCountSelector,
  useItemsSelector,
} from '@/features/cart';
import { Layout } from '@/widgets/layout';

import { useTotalPriceSelector } from '../../features/cart/store';

export default function Content() {
  const items = useItemsSelector();
  const [doughTypes] = useDoughTypes();
  const [sizes] = usePizzaSizes();
  const itemsCount = useItemsInCartCountSelector();
  const totalPrice = useTotalPriceSelector();
  const clearCart = useCartStore(s => s.clearCart);
  const removeItemFromCart = useCartStore(s => s.removeItemFromCart);
  const increaseItemInCart = useCartStore(s => s.increaseItemInCart);
  const decreaseItemInCart = useCartStore(s => s.decreaseItemInCart);

  return (
    <Layout>
      <div className="min-w-[960px] self-center">
        <div className="flex items-center justify-between mt-16 border-b-2 border-neutral-100 pb-4">
          <div className="flex items-center">
            <ShoppingCartIcon className="h-8 w-8 mb-1 mr-2" />
            <h2 className="text-xl font-bold">Корзина</h2>
          </div>

          <button className="flex items-center" onClick={clearCart}>
            <TrashIcon className="w-4 h-4" />
            Очистить корзину
          </button>
        </div>
        {items.length ? (
          <>
            <ul className="my-12">
              {items.map(item => {
                const doughType = doughTypes.find(({ id }) => id === item.doughTypeId);
                const size = sizes.find(({ id }) => id === item.sizeId);

                return (
                  <li key={item.id} className="flex items-center">
                    <Image src={item.pizza.image} alt={item.pizza.name} height="100" width="100" />
                    <div className="ml-4 flex-1">
                      <p className="font-bold text-lg">{item.pizza.name}</p>
                      <p>
                        {doughType?.title}, {size?.title}
                      </p>
                    </div>
                    <div className="flex items-center ml-8">
                      <button
                        onClick={() => decreaseItemInCart(item)}
                        className="text-orange-500 rounded-full border-2 border-orange-500 p-1 hover:bg-orange-50 transition-all">
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="mx-4 font-bold text-orange-500">{item.count}</span>
                      <button
                        onClick={() => increaseItemInCart(item)}
                        className="text-orange-500 rounded-full border-2 border-orange-500 p-1 hover:bg-orange-50 transition-all">
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mx-8 font-bold text-xl">{item.count * item.price} руб.</p>
                    <button
                      onClick={() => removeItemFromCart(item)}
                      className="text-neutral-300 border-2 border-neutral-300 p-1 rounded-full">
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="text-xl flex items-center justify-between my-8">
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

        <div className="flex justify-between">
          <Link
            href="/"
            className="rounded-full p-4 pl-6 pr-8 flex border-2 border-neutral-300 text-neutral-300 items-center">
            <ChevronLeftIcon className="w-6 h-6 mr-4" />
            Вернуться назад
          </Link>

          {itemsCount > 0 && (
            <button className="rounded-full p-4 flex bg-orange-500 text-white font-semibold px-8 items-center">
              Оплатить сейчас
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
