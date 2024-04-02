import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname !== '/dashboard' && pathname !== '/') {
    return Response.redirect(new URL('/', request.url))
  }
  if (pathname == '/dashboard') {
    const currentUser = request.cookies.get('token')?.value;
    if (!currentUser) {
      return Response.redirect(new URL('/', request.url));
    }
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}