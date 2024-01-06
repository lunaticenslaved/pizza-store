'use client';

import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/ui/button';

export function SignInButton() {
  return (
    <Button asChild variant="ghost">
      <Link href="/sign-in" className="flex item-center justify-center gap-x-2">
        <LogInIcon />
        Войти
      </Link>
    </Button>
  );
}
