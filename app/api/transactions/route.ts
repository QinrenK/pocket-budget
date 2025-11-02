/**
 * GET /api/transactions
 * Fetch all transactions with optional filters
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/supabase/types';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { searchParams } = new URL(request.url);

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Build query
    let query = supabase
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
      .order('ts', { ascending: false });

    // Apply filters
    const range = searchParams.get('range');
    if (range && range !== 'all') {
      const now = new Date();
      const start = new Date();

      if (range === 'week') {
        const dayOfWeek = now.getDay();
        const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        start.setDate(now.getDate() - diff);
        start.setHours(0, 0, 0, 0);
      } else if (range === 'month') {
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
      }

      query = query.gte('ts', start.toISOString());
    }

    const categoryId = searchParams.get('category_id');
    if (categoryId) {
      query = query.eq('category_id', parseInt(categoryId));
    }

    // Execute query
    const { data: transactions, error: txError } = await query.limit(100);

    if (txError) {
      console.error('Transaction fetch error:', txError);
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }

    // Format transactions
    const formattedTransactions = (transactions || []).map((tx: any) => ({
      id: tx.id,
      amount: Number(tx.amount),
      ts: tx.ts,
      category: tx.categories?.name || 'Uncategorized',
      categoryId: tx.categories?.id || null,
      icon: tx.categories?.icon || '📦',
      color: tx.categories?.color || '#8A8A8A',
      items: Array.isArray(tx.items) ? tx.items : [],
      vendor: tx.vendor,
      source: tx.source,
    }));

    return NextResponse.json({
      transactions: formattedTransactions,
      count: formattedTransactions.length,
    });
  } catch (error) {
    console.error('Transactions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

