export function middleware(request) {
  const username = request.cookies.get('token')?.value;
    if (!username) 
        return Response.redirect(new URL('http://localhost:3000', request.url));
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}