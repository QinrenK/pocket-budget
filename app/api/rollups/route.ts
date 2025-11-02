/**
 * GET /api/rollups?range=today|week|month
 * Get aggregated totals and category breakdowns for a time range
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/supabase/types';

type RangeType = 'today' | 'week' | 'month';

function getDateRange(range: RangeType): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date();

  switch (range) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      const dayOfWeek = now.getDay();
      const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday as start
      start.setDate(now.getDate() - diff);
      start.setHours(0, 0, 0, 0);
      break;
    case 'month':
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
  }

  return { start, end: now };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = (searchParams.get('range') as RangeType) || 'today';

    if (!['today', 'week', 'month'].includes(range)) {
      return NextResponse.json({ error: 'Invalid range parameter' }, { status: 400 });
    }

    // Initialize Supabase client
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get date range
    const { start, end } = getDateRange(range);

    // Fetch transactions in range
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select(
        `
        id,
        amount,
        ts,
        category_id,
        categories (
          id,
          name,
          icon,
          color
        )
      `
      )
      .eq('user_id', user.id)
      .gte('ts', start.toISOString())
      .lte('ts', end.toISOString())
      .order('ts', { ascending: false });

    if (txError) {
      console.error('Transaction fetch error:', txError);
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }

    // Calculate total
    const total = (transactions || []).reduce((sum, tx) => sum + Number(tx.amount), 0);

    // Group by category
    const byCategory = new Map<
      number | null,
      {
        categoryId: number | null;
        categoryName: string;
        icon: string;
        color: string;
        total: number;
        count: number;
      }
    >();

    for (const tx of transactions || []) {
      const categoryId = tx.category_id;
      const categoryName = (tx.categories as any)?.name || 'Uncategorized';
      const icon = (tx.categories as any)?.icon || '📦';
      const color = (tx.categories as any)?.color || '#8A8A8A';

      if (!byCategory.has(categoryId)) {
        byCategory.set(categoryId, {
          categoryId,
          categoryName,
          icon,
          color,
          total: 0,
          count: 0,
        });
      }

      const category = byCategory.get(categoryId)!;
      category.total += Number(tx.amount);
      category.count += 1;
    }

    // Convert to array and sort by total (descending)
    const categoryBreakdown = Array.from(byCategory.values()).sort((a, b) => b.total - a.total);

    return NextResponse.json({
      range,
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
      total: parseFloat(total.toFixed(2)),
      transactionCount: transactions?.length || 0,
      byCategory: categoryBreakdown.map((cat) => ({
        ...cat,
        total: parseFloat(cat.total.toFixed(2)),
        percentage: total > 0 ? parseFloat(((cat.total / total) * 100).toFixed(1)) : 0,
      })),
    });
  } catch (error) {
    console.error('Rollups error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

