import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const validPaths = ['/', '/dashboard', '/checkbalance', '/withdrawcash']
  if (!validPaths.includes(pathname)) {
    return Response.redirect(new URL('/', request.url))
  }
  const currentUser = request.cookies.get('token')?.value;
  if (!currentUser && pathname !== '/') {
    return Response.redirect(new URL('/', request.url));
  }  
  if (pathname == '/checkbalance') {
    return Response.redirect(new URL(`${process.env.ACCOUNT_MFE_URL}/checkbalance`, request.url));
  }
  if (pathname == '/withdrawcash') {
    return Response.redirect(new URL(`${process.env.ACCOUNT_MFE_URL}/withdrawcash`, request.url));
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}