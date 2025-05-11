if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oqkhxwpkrxecidrfmoyb.supabase.co',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
}; 