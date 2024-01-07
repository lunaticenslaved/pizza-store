'use client';

import { RiLoginBoxLine } from 'react-icons/ri';

import Link from 'next/link';

import { Button } from '@/shared/ui/button';

export function SignInButton() {
  return (
    <Button asChild variant="ghost">
      <Link href="/sign-in" className="flex item-center justify-center gap-x-2">
        <RiLoginBoxLine className="h-6 w-6" />
        Войти
      </Link>
    </Button>
  );
}
