/**
 * Supabase Server Client
 * For use in Server Components, API Routes, and Server Actions
 */

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from './types';

export function createServerClient() {
  return createServerComponentClient<Database>({ cookies });
}

export function createRouteClient() {
  return createRouteHandlerClient<Database>({ cookies });
}

