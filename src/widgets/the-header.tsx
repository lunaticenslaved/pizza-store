import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import Image from 'next/image';

interface TheHeaderProps {
  className?: string;
  itemsInCartCount: number;
}

export function TheHeader({ className, itemsInCartCount }: TheHeaderProps) {
  return (
    <div
      className={classNames(
        'py-8 flex justify-between items-center border-b-2 border-neutral-100',
        className,
      )}>
      <div className="flex items-center">
        <Image
          className="mr-4"
          width="48"
          height="48"
          src="/images/pizza-logo.svg"
          alt="Pizza logo"
        />
        <div>
          <h1 className="m-0 font-bold text-2xl">React Pizza</h1>
          <p className="m-0">самая вкусная пицца во вселенной</p>
        </div>
      </div>

      <div className="bg-orange-500 flex items-center flex-nowrap rounded-full px-6 py-4 text-white font-medium">
        <a href="/cart.html" className="flex flex-nowrap">
          <span>520 ₽</span>

          <div className="border-r-2 border-orange-400 opacity-50 mx-4"></div>

          <div className="flex items-center min-w-12 justify-center">
            <ShoppingCartIcon className="h-4 w-4 mb-1 mr-2" />
            <span>{itemsInCartCount}</span>
          </div>
        </a>
      </div>
    </div>
  );
}
