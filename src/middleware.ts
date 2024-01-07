import { NextResponse } from 'next/server';

import { auth } from '../auth';
import { isPrivateRoute as isPrivateRouteFn } from '../routes';

export const middleware = auth(request => {
  const { auth, nextUrl } = request;

  const isLoggedIn = !!auth?.user;
  const isPrivateRoute = isPrivateRouteFn(nextUrl.pathname);

  if (!isLoggedIn && isPrivateRoute) {
    const redirectTo = nextUrl.href.replace(nextUrl.origin, '').replace(/^\//, '');
    return NextResponse.redirect(
      new URL(redirectTo ? `/sign-in?redirectTo=/${redirectTo}` : '/sign-in', nextUrl),
    );
  }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
