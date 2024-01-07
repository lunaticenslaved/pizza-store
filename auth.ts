import NextAuth from 'next-auth';

import { adapter } from './auth.adapter';
import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
  adapter,
});
