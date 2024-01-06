import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

export function SignInButton() {
  return (
    <Link href="/sign-in" className="flex item-center justify-center gap-x-2">
      <LogInIcon />
      Войти
    </Link>
  );
}
