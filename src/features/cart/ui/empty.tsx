import classNames from 'classnames';
import Image from 'next/image';

interface EmptyCartProps {
  className?: string;
}

export function EmptyCart({ className }: EmptyCartProps) {
  return (
    <div className={classNames(`flex-1 flex flex-col justify-center items-center`, className)}>
      <Image src="/images/empty-cart.png" alt="Empty cart" height="300" width="300" />
      <h4 className="font-semibold text-lg mt-8 text-center">
        Корзина пуста. Положите в неё что-нибудь вкусненькое
      </h4>
    </div>
  );
}
