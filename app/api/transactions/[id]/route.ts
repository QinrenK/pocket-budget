/**
 * DELETE /api/transactions/[id]
 * Delete a specific transaction
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/supabase/types';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const transactionId = parseInt(params.id);
    if (isNaN(transactionId)) {
      return NextResponse.json({ error: 'Invalid transaction ID' }, { status: 400 });
    }

    // Delete transaction (RLS ensures user can only delete their own)
    const { error: deleteError } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Delete transaction error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

