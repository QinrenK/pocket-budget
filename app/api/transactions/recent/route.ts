/**
 * GET /api/transactions/recent
 * Fetch recent transactions for display on home page (default 20, max 20)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/supabase/types';

export async function GET(request: NextRequest) {
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

    // Get limit from query params (default 20, max 20)
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = Math.min(parseInt(limitParam || '20', 10), 20);

    // Fetch recent transactions with category info
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select(
        `
        id,
        ts,
        amount,
        items,
        raw_text,
        vendor,
        source,
        categories (
          id,
          name,
          icon,
          color
        )
      `
      )
      .eq('user_id', user.id)
      .order('ts', { ascending: false })
      .limit(limit);

    if (txError) {
      console.error('Transaction fetch error:', txError);
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }

    // Format transactions for frontend
    const formattedTransactions = (transactions || []).map((tx: any) => ({
      id: tx.id,
      amount: Number(tx.amount),
      ts: tx.ts,
      category: tx.categories?.name || 'Uncategorized',
      items: Array.isArray(tx.items) ? tx.items : [],
      vendor: tx.vendor,
      source: tx.source,
    }));

    return NextResponse.json({
      transactions: formattedTransactions,
      count: formattedTransactions.length,
    });
  } catch (error) {
    console.error('Recent transactions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

