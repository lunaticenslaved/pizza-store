import Link from 'next/link';

import { Button } from '@/shared/ui/button';

export function GoToCartButton() {
  return (
    <Button asChild>
      <Link href="/cart">Перейти в корзину</Link>
    </Button>
  );
}
