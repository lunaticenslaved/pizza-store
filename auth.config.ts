import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize() {
        return {
          id: 'user',
          name: 'user',
          email: 'user@email.ru',
        };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // TODO: Replace with real check

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async session({ session, token }) {
      if (!token.sub) return session;

      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      // TODO: Replace with real user retrieval
      token.id = 'id';
      token.name = 'user';
      token.email = 'user@email.ru';

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
