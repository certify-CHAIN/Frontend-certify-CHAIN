import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar si las variables de entorno están configuradas correctamente
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseAnonKey !== 'placeholder_key_here';

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase no está configurado correctamente. Usando localStorage como fallback.');
  console.warn('📋 Por favor, configura las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.local');
}

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export { isSupabaseConfigured };

// Tipos para la base de datos
export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          id: string;
          wallet_address: string;
          rol: 'director' | 'estudiante';
          nombre: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          wallet_address: string;
          rol: 'director' | 'estudiante';
          nombre: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          wallet_address?: string;
          rol?: 'director' | 'estudiante';
          nombre?: string;
          created_at?: string;
        };
      };
    };
  };
}