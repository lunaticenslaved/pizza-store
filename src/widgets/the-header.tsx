import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface TheHeaderProps {
  className?: string;
  itemsInCartCount: number;
  totalPrice: number;
  onCartClick?(): void;
}

export function TheHeader({
  className,
  itemsInCartCount,
  totalPrice,
  onCartClick,
}: TheHeaderProps) {
  return (
    <header
      className={classNames(
        'py-2 sm:py-4 flex justify-between items-center border-b-2 border-neutral-100 sticky top-0 z-50 bg-white',
        className,
      )}>
      <Link href="/" className="flex items-center cursor-pointer">
        <Image
          className="mr-4"
          width="48"
          height="48"
          src="/images/pizza-logo.svg"
          alt="Pizza logo"
        />
        <div className="my-4">
          <h1 className="m-0 font-bold text-2xl">React Pizza</h1>
          <p className="m-0 truncate hidden sm:block">самая вкусная пицца во вселенной</p>
        </div>
      </Link>

      <button
        onClick={onCartClick}
        className="bg-orange-500 flex items-center flex-nowrap rounded-full px-3 py-2 sm:px-6 sm:py-4 text-white font-medium">
        <span>{totalPrice} ₽</span>

        <div className="border-r-2 border-orange-400 opacity-50 mx-2 sm:mx-4 hidden sm:block"></div>

        <div className="items-center min-w-12 justify-center hidden sm:flex">
          <ShoppingCartIcon className="h-4 w-4 mb-1 mr-2" />
          <span>{itemsInCartCount}</span>
        </div>
      </button>
    </header>
  );
}
