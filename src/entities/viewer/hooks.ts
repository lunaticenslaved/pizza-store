import { useSession } from 'next-auth/react';

export function useCurrentUser() {
  const session = useSession();
  const user = session.data?.user;

  return user;
}
