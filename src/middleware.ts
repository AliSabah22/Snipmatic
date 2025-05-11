import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseConfig } from './lib/supabase/config';

if (!supabaseConfig.anonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

export async function middleware(request: NextRequest) {
  console.log('Middleware - Processing request for path:', request.nextUrl.pathname);
  
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({
    req: request,
    res,
    supabaseUrl: supabaseConfig.url,
    supabaseKey: supabaseConfig.anonKey,
  });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log('Middleware - Session exists:', !!session);

    // If user is not signed in and the current path is not /login or /signup,
    // redirect the user to /login
    if (!session && !['/login', '/signup'].includes(request.nextUrl.pathname)) {
      console.log('Middleware - Redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // If user is signed in and the current path is /login or /signup,
    // redirect the user to /dashboard
    if (session && ['/login', '/signup'].includes(request.nextUrl.pathname)) {
      console.log('Middleware - Redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware - Error:', error);
    return res;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'edge',
}; 