import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center cursor-pointer">
      <Image
        className="mr-4"
        width="24"
        height="24"
        src="/images/pizza-logo.svg"
        alt="Pizza logo"
      />
      <div>
        <h1 className="m-0 font-bold text-xl">React Pizza</h1>
        <p className="m-0 -mt-2 truncate hidden sm:block">самая вкусная пицца во вселенной React</p>
      </div>
    </Link>
  );
}
