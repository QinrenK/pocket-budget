/**
 * POST /api/ingest
 * Create a new transaction from text or receipt input
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { parseExpenseText, parseReceiptText } from '@/lib/parser';
import { categorizeTransaction } from '@/lib/categorizer';
import type { Database } from '@/lib/supabase/types';

const IngestSchema = z.object({
  raw_text: z.string().min(1).max(8192),
  source: z.enum(['text', 'receipt']).default('text'),
  items: z
    .array(
      z.object({
        name: z.string(),
        amount: z.number().positive(),
      })
    )
    .optional(),
  note: z.string().max(500).optional(),
  image_url: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validated = IngestSchema.parse(body);

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

    // Parse the text
    const parseResult =
      validated.source === 'receipt'
        ? parseReceiptText(validated.raw_text)
        : parseExpenseText(validated.raw_text);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: parseResult.error || 'Failed to parse input',
          candidates: parseResult.candidates,
        },
        { status: 400 }
      );
    }

    // Get user's categories and vendor rules
    const [categoriesResult, vendorRulesResult] = await Promise.all([
      supabase.from('categories').select('*').eq('user_id', user.id),
      supabase.from('vendor_rules').select('*').eq('user_id', user.id),
    ]);

    if (categoriesResult.error) {
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }

    if (vendorRulesResult.error) {
      return NextResponse.json({ error: 'Failed to fetch vendor rules' }, { status: 500 });
    }

    // Categorize the transaction
    const categorizationResult = categorizeTransaction(
      parseResult.rawText,
      parseResult.items,
      parseResult.vendor,
      categoriesResult.data || [],
      vendorRulesResult.data || []
    );

    // Insert transaction
    const { data: transaction, error: insertError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        ts: new Date().toISOString(),
        source: validated.source,
        raw_text: parseResult.rawText,
        amount: parseResult.total,
        items: parseResult.items as any,
        category_id: categorizationResult.categoryId,
        vendor: parseResult.vendor || null,
        note: validated.note || null,
        image_url: validated.image_url || null,
      })
      .select()
      .single();

    if (insertError || !transaction) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Failed to save transaction' }, { status: 500 });
    }

    // Get today's total
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { data: todayTransactions } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', user.id)
      .gte('ts', today.toISOString());

    const todayTotal = (todayTransactions || []).reduce((sum, tx) => sum + Number(tx.amount), 0);

    return NextResponse.json(
      {
        ok: true,
        transaction: {
          id: transaction.id,
          amount: transaction.amount,
          category: categorizationResult.categoryName,
          categoryId: categorizationResult.categoryId,
          confidence: categorizationResult.confidence,
          matchedBy: categorizationResult.matchedBy,
        },
        todayTotal,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ingest error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Rate limiting would go here in production
// Using Vercel Edge Config or similar

