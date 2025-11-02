/**
 * Supabase Client (Browser)
 * For use in client components and browser context
 */

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './types';

export function createClient() {
  return createClientComponentClient<Database>();
}

// Singleton instance
let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient();
  }
  return supabaseClient;
}

