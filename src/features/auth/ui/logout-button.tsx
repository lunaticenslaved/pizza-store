import { RiLogoutBoxLine } from 'react-icons/ri';

import { Button } from '@/shared/ui/button';

import { logout } from '../server-actions';

export function LogoutButton() {
  return (
    <Button variant="ghost" onClick={() => logout()}>
      <RiLogoutBoxLine className="h-6 w-6 mr-2" />
      Выйти
    </Button>
  );
}
