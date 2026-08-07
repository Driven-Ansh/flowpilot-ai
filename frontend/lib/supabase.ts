/**
 * Supabase client configuration.
 *
 * In mock mode (no env vars), this returns null and components
 * gracefully degrade to use local/mock state.
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Supabase client instance. Null in mock mode (no env vars configured). */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/** Whether the app is running with a live Supabase connection */
export const isMockMode = !supabaseUrl || !supabaseAnonKey;
