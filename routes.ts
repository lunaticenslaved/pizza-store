export function isPrivateRoute(route: string) {
  return route.startsWith('/payment') || route.startsWith('/account');
}
