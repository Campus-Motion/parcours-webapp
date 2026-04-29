import { NextResponse } from 'next/server';

export function middleware(request) {
  const userId = request.cookies.get('userId')?.value;
  const url = request.nextUrl.clone();

  // If trying to access a station without an active session
  if (url.pathname.startsWith('/station/') && !userId) {
    const stationId = url.pathname.split('/')[2];
    url.pathname = '/';
    url.searchParams.set('station', stationId);
    return NextResponse.redirect(url);
  }

  // If trying to access protected routes without a session
  if ((url.pathname === '/summary' || url.pathname === '/map' || url.pathname.startsWith('/transit/')) && !userId) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/station/:path*', '/summary', '/map', '/transit/:path*'],
};
