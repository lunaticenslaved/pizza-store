import { LogInIcon } from 'lucide-react';

export function SignInButton() {
  return (
    <button className="flex item-center justify-center gap-x-2">
      <LogInIcon />
      Войти
    </button>
  );
}
