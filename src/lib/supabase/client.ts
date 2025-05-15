import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oqkhxwpkrxecidrfmoyb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa2h4d3BrcnhlY2lkcmZtb3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODkyMzksImV4cCI6MjA2MjU2NTIzOX0.Hek_meFa2_d0ftx3mT2dUihHu4Mi3vYutTB6YdG_i7w;'

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