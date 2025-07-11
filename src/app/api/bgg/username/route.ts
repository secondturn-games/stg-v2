import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { data, error } = await supabase
    .from('bgg_accounts')
    .select('bgg_username')
    .eq('clerk_user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ bgg_username: data?.bgg_username || null });
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const { bgg_username } = body;
  if (!bgg_username || typeof bgg_username !== 'string') {
    return NextResponse.json({ error: 'Invalid BGG username' }, { status: 400 });
  }
  const { error } = await supabase
    .from('bgg_accounts')
    .upsert({ clerk_user_id: userId, bgg_username });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
} 