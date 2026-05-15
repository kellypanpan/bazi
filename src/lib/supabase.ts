import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  'https://zwvofmdjuemejswxwtua.supabase.co';
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dm9mbWRqdWVtZWpzd3h3dHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTQxMTMsImV4cCI6MjA5NDQzMDExM30.YoPOzmrd6Mcdy_VhkljJHsGp3cdL9Mp9sLFfFvD0Obs';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
