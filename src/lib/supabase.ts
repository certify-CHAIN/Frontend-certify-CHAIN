import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Crear cliente de Supabase directamente como en CertificatePage.tsx
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🔌 Supabase configurado:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey
});

// Types for the database
export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          id: string;
          wallet_address: string;
          rol: 'director' | 'student';
          nombre: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          wallet_address: string;
          rol: 'director' | 'student';
          nombre: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          wallet_address?: string;
          rol?: 'director' | 'student';
          nombre?: string;
          created_at?: string;
        };
      };
    };
  };
}