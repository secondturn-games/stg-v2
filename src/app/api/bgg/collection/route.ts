import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getAuth } from '@clerk/nextjs/server';
import xml2js from 'xml2js';

async function fetchBGGCollection(username: string) {
  const url = `https://boardgamegeek.com/xmlapi2/collection?username=${encodeURIComponent(username)}&subtype=boardgame&own=1&version=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch BGG collection');
  const xml = await res.text();
  return xml2js.parseStringPromise(xml, { explicitArray: false });
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
  try {
    const parsed = await fetchBGGCollection(bgg_username);
    const items = parsed?.items?.item;
    if (!items) {
      return NextResponse.json({ error: 'No collection found' }, { status: 404 });
    }
    // Ensure items is always an array
    const games = Array.isArray(items) ? items : [items];
    const collection = games
      .filter((item) => item.status?.['$']?.own === '1')
      .map((item) => ({
        objectid: item['$'].objectid,
        name: Array.isArray(item.name) ? item.name[0]['_'] : (item.name?._ || item.name),
        yearpublished: item.yearpublished?._ || item.yearpublished,
        thumbnail: item.thumbnail || '',
        status: { own: item.status?.['$']?.own === '1' },
        originalname: item.name?.['$']?.sortindex === '1' ? item.name?._ : undefined,
        version: item.versionnum || null,
      }));
    // Save to Supabase (upsert per user/game)
    for (const game of collection) {
      await supabase.from('user_collections').upsert({
        clerk_user_id: userId,
        objectid: game.objectid,
        name: game.name,
        yearpublished: game.yearpublished,
        thumbnail: game.thumbnail,
        status: game.status,
        originalname: game.originalname,
        version: game.version,
      }, { onConflict: 'clerk_user_id,objectid' }); // Fix: onConflict should be a string
    }
    return NextResponse.json({ success: true, count: collection.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to fetch or save collection' }, { status: 500 });
  }
} 