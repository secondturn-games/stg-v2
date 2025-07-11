import { NextRequest, NextResponse } from 'next/server';
import xml2js from 'xml2js';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  if (!q) {
    return NextResponse.json({ games: [] });
  }
  try {
    const url = `https://boardgamegeek.com/xmlapi2/search?type=boardgame&query=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch BGG search');
    const xml = await res.text();
    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });
    const items = parsed?.items?.item;
    if (!items) return NextResponse.json({ games: [] });
    const games = (Array.isArray(items) ? items : [items])
      .map(item => ({
        objectid: item['$'].id,
        name: Array.isArray(item.name) ? item.name[0]['_'] : (item.name?._ || item.name),
        yearpublished: item.yearpublished?._ || item.yearpublished,
        thumbnail: '', // BGG search API does not return thumbnail, can be fetched later if needed
      }));
    return NextResponse.json({ games });
  } catch {
    return NextResponse.json({ error: 'Failed to search BGG' }, { status: 500 });
  }
} 