import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware();

export const config = {
  matcher: ['/dashboard(.*)', '/profile(.*)'],
}; 