import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseConfig } from './lib/supabase/config';
import { withAuth } from "next-auth/middleware";

if (!supabaseConfig.anonKey) {
  throw new Error('Missing Supabase anon key');
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add Supabase headers
  response.headers.set('x-supabase-url', supabaseConfig.url);
  response.headers.set('x-supabase-anon-key', supabaseConfig.anonKey);

  return response;
}

// Configure NextAuth middleware
const authMiddleware = withAuth({
  pages: {
    signIn: "/login",
  },
});

// Export the combined middleware
export default authMiddleware;

// Configure which routes to protect
export const config = {
  matcher: [
    // Protected routes
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",
    // Public routes that need Supabase headers
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 