import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center cursor-pointer">
      <Image
        className="mr-4"
        width="48"
        height="48"
        src="/images/pizza-logo.svg"
        alt="Pizza logo"
      />
      <div>
        <h1 className="m-0 font-bold text-2xl">React Pizza</h1>
        <p className="m-0 truncate hidden sm:block">самая вкусная пицца во вселенной</p>
      </div>
    </Link>
  );
}
