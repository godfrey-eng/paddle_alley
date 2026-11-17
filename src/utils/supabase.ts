import { createClient } from '@supabase/supabase-js';

// The single Supabase client for the whole app. Sharing one client means the
// admin's signed-in session is used for every write (settings, confirmations).
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
