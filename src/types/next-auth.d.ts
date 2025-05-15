import NextAuth, { DefaultSession } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    supabaseAccessToken?: string;
    user: {
      id: string; // Prisma User ID
      supabaseUserId?: string | null; // Supabase Auth User ID
    } & DefaultSession["user"]; // Keep existing name, email, image
  }

  // We are not directly extending DefaultUser here as the PrismaAdapter maps it.
  // User object available in callbacks like `authorize` or `jwt` (if `user` object is passed)
  interface User {
    supabaseUserId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    supabaseUserId?: string | null;
    supabaseAccessToken?: string;
    // Consider adding supabaseRefreshToken if you plan to manage token refresh
  }
} 