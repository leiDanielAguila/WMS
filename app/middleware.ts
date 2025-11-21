// middleware.ts
import { type NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Define which paths the middleware should run on.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /api/... (your API routes if you don't need auth check there)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Example to protect specific routes:
    // '/dashboard/:path*',
  ],
};