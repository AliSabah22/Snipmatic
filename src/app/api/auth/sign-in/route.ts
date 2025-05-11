import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const supabaseUrl = 'https://oqkhxwpkrxecidrfmoyb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

export async function POST(request: Request) {
  console.log('Sign-in API - Starting request processing');
  
  try {
    const requestUrl = new URL(request.url);
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    
    console.log('Sign-in API - Attempting sign in for email:', email);
    
    const supabase = createRouteHandlerClient({
      cookies,
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
    });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign-in API - Error:', error.message);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${error.message}`,
        {
          status: 301,
        }
      );
    }

    console.log('Sign-in API - Sign in successful, redirecting to dashboard');
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
      status: 301,
    });
  } catch (error) {
    console.error('Sign-in API - Unexpected error:', error);
    const requestUrl = new URL(request.url);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=An unexpected error occurred`,
      {
        status: 301,
      }
    );
  }
} 