/**
 * GET /api/categories
 * Fetch all categories for the authenticated user
 */

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/supabase/types';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name, icon, color, keywords_en, keywords_zh, is_system')
      .eq('user_id', user.id)
      .order('name');

    if (catError) {
      console.error('Categories fetch error:', catError);
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }

    return NextResponse.json({
      categories: categories || [],
      count: categories?.length || 0,
    });
  } catch (error) {
    console.error('Categories error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

