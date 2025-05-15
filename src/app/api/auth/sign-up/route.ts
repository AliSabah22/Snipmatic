import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  // Attempt to get name from formData, assuming it might be provided
  const name = formData.get('name') ? String(formData.get('name')) : undefined; 

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: supabaseSignupData, error: supabaseSignupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      // You can pass additional user metadata here if needed
      // data: { full_name: name } 
    },
  });

  if (supabaseSignupError) {
    return NextResponse.redirect(
      `${requestUrl.origin}/signup?error=${encodeURIComponent(supabaseSignupError.message)}`,
      { status: 301 }
    );
  }

  if (!supabaseSignupData.user) {
    return NextResponse.redirect(
      `${requestUrl.origin}/signup?error=${encodeURIComponent('Supabase sign up failed to return user data.')}`,
      { status: 301 }
    );
  }

  const supabaseUser = supabaseSignupData.user;

  try {
    // Check if user already exists in Prisma with this email or supabaseUserId
    let existingUser = await prisma.user.findUnique({
      where: { email: supabaseUser.email! },
    });

    if (existingUser) {
      // If user exists by email, update their supabaseUserId if it's not already set
      if (!existingUser.supabaseUserId) {
        await prisma.user.update({
          where: { email: supabaseUser.email! },
          data: {
            supabaseUserId: supabaseUser.id,
            name: existingUser.name || name || supabaseUser.email?.split('@')[0], // Prioritize existing name, then form name, then default
            // emailVerified: supabaseUser.email_confirmed_at ? new Date(supabaseUser.email_confirmed_at) : null, // Update if needed
          },
        });
      }
      // If supabaseUserId already exists and matches, or different, decide on behavior (e.g., log, error, or proceed)
      // For now, we assume if they exist by email and supabaseID is set, it's okay.
    } else {
      // If user does not exist by email, check by supabaseUserId (less likely for signup but good practice)
      existingUser = await prisma.user.findUnique({
        where: { supabaseUserId: supabaseUser.id },
      });
      if (existingUser) {
        // User exists by supabaseUserId, maybe update email if different and verified?
        // For now, consider this an edge case, potentially an update scenario.
      } else {
        // Create new user in Prisma
        await prisma.user.create({
          data: {
            email: supabaseUser.email!,
            supabaseUserId: supabaseUser.id,
            name: name || supabaseUser.email?.split('@')[0], // Use provided name or default from email
            // emailVerified: supabaseUser.email_confirmed_at ? new Date(supabaseUser.email_confirmed_at) : null,
            // Password is not stored here; Supabase handles it.
          },
        });
      }
    }

    // Redirect to a page indicating to check email for verification
    return NextResponse.redirect(
      `${requestUrl.origin}/signup?message=${encodeURIComponent('Please check your email to confirm your account.')}`,
      { status: 301 }
    );

  } catch (prismaError: any) {
    console.error("Prisma error during sign-up:", prismaError);
    // Potentially, we might want to "undo" the Supabase sign-up if Prisma fails,
    // but that's complex (e.g., by deleting the Supabase user).
    // For now, redirect with a generic error.
    // Also, Supabase user might exist now, but Prisma user creation failed.
    // Consider also logging this error more robustly.
    
    // Attempt to inform user about Supabase success but Prisma failure
    let errorMessage = 'Account created with authentication provider, but failed to sync with our system. Please contact support.';
    if (prismaError.code === 'P2002' && prismaError.meta?.target?.includes('email')) {
        errorMessage = 'This email is already registered in our system with a different authentication method.';
    } else if (prismaError.code === 'P2002' && prismaError.meta?.target?.includes('supabaseUserId')) {
        errorMessage = 'This authentication account is already linked in our system.';
    }
    
    return NextResponse.redirect(
      `${requestUrl.origin}/signup?error=${encodeURIComponent(errorMessage)}&supabase_signup_success=true`,
      { status: 301 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 