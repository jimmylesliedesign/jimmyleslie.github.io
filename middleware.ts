import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes - add any new case study paths here
const PROTECTED_ROUTES = ['/travelperk', '/bunnings'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if this is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // Check for authentication cookie
  const authCookie = request.cookies.get('case-study-auth');
  
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }
  
  // Redirect to password page with return URL
  const url = request.nextUrl.clone();
  url.pathname = '/password';
  url.searchParams.set('return', pathname);
  
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/travelperk/:path*', '/bunnings/:path*'],
};
