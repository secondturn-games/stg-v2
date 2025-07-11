import { NextRequest, NextResponse } from 'next/server';
import xml2js from 'xml2js';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const q = (searchParams.get('q') || '').toLowerCase();
  if (!username || !q) {
    return NextResponse.json({ games: [] });
  }
  try {
    const url = `https://boardgamegeek.com/xmlapi2/collection?username=${encodeURIComponent(username)}&subtype=boardgame&own=1&version=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch BGG collection');
    const xml = await res.text();
    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });
    const items = parsed?.items?.item;
    if (!items) return NextResponse.json({ games: [] });
    const games = (Array.isArray(items) ? items : [items])
      .filter(item => item.status?.['$']?.own === '1')
      .map(item => ({
        objectid: item['$'].objectid,
        name: Array.isArray(item.name) ? item.name[0]['_'] : (item.name?._ || item.name),
        originalname: item.name?.['$']?.sortindex === '1' ? item.name?._ : undefined,
        yearpublished: item.yearpublished?._ || item.yearpublished,
        thumbnail: item.thumbnail || '',
      }))
      .filter(game =>
        (game.name && game.name.toLowerCase().includes(q)) ||
        (game.originalname && game.originalname.toLowerCase().includes(q))
      );
    return NextResponse.json({ games });
  } catch (e: any) {
    return NextResponse.json({ games: [] });
  }
} 