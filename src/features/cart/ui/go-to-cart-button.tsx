import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/shared/ui/button';

export function GoToCartButton() {
  const pathname = usePathname();

  if (pathname === '/cart') {
    return null;
  }

  return (
    <Button asChild>
      <Link href="/cart">Перейти в корзину</Link>
    </Button>
  );
}
