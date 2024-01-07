import { auth } from './auth';
import { isPrivateRoute as isPrivateRouteFn } from './routes';

export const middleware = auth(request => {
  const { auth, nextUrl } = request;

  console.log('MIDDLEWARE');

  const isLoggedIn = !!auth?.user;

  const isPrivateRoute = isPrivateRouteFn(nextUrl.pathname);

  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL('/sign-in', nextUrl));
  }

  return true;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
