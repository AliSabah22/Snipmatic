import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oqkhxwpkrxecidrfmoyb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      videos: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          status: 'pending' | 'processing' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
          duration: number;
          storage_path: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          status: 'pending' | 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
          duration?: number;
          storage_path: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
          duration?: number;
          storage_path?: string;
        };
      };
      clips: {
        Row: {
          id: string;
          video_id: string;
          start_time: number;
          end_time: number;
          score: number;
          status: 'pending' | 'processing' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
          storage_path: string | null;
        };
        Insert: {
          id?: string;
          video_id: string;
          start_time: number;
          end_time: number;
          score: number;
          status: 'pending' | 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
          storage_path?: string | null;
        };
        Update: {
          id?: string;
          video_id?: string;
          start_time?: number;
          end_time?: number;
          score?: number;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
          storage_path?: string | null;
        };
      };
    };
  };
}; 