import Link from 'next/link';

import { Button } from '@/shared/ui/button';

export function AccountButton() {
  return (
    <Button variant="ghost" asChild>
      <Link href="/account">В аккаунт</Link>
    </Button>
  );
}
