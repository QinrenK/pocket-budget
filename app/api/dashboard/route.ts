/**
 * Dashboard API Route
 * Returns aggregated spending data by category and time range
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'month';

    // Calculate date range
    const now = new Date();
    let startDate = new Date();

    switch (range) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setDate(now.getDate() - 30);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Fetch transactions with categories
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
      .eq('user_id', userId)
      .gte('ts', startDate.toISOString())
      .lte('ts', now.toISOString())
      .order('ts', { ascending: false });

    if (txError) {
      console.error('Transaction fetch error:', txError);
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }

    // Aggregate by category
    const categoryMap = new Map<
      string,
      {
        category: string;
        icon: string;
        color: string;
        total: number;
        transactionCount: number;
      }
    >();

    let totalSpent = 0;

    transactions?.forEach((tx) => {
      const categoryName =
        tx.categories?.name || 'Uncategorized';
      const icon = tx.categories?.icon || '❓';
      const color = tx.categories?.color || '#8A8A8A';
      const amount = tx.amount;

      totalSpent += amount;

      if (categoryMap.has(categoryName)) {
        const existing = categoryMap.get(categoryName)!;
        existing.total += amount;
        existing.transactionCount += 1;
      } else {
        categoryMap.set(categoryName, {
          category: categoryName,
          icon,
          color,
          total: amount,
          transactionCount: 1,
        });
      }
    });

    // Convert to array and sort by total
    const categoryTotals = Array.from(categoryMap.values())
      .sort((a, b) => b.total - a.total)
      .map((cat) => ({
        ...cat,
        percentage: totalSpent > 0 ? (cat.total / totalSpent) * 100 : 0,
      }));

    // Generate spending trend (simplified for now)
    const spendingTrend = [
      { period: 'Week 1', amount: 0 },
      { period: 'Week 2', amount: 0 },
      { period: 'Week 3', amount: 0 },
      { period: 'Week 4', amount: 0 },
    ];

    return NextResponse.json({
      categoryTotals,
      spendingTrend,
      totalSpent,
      transactionCount: transactions?.length || 0,
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

