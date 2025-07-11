import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!api/webhook|_next/static|_next/image|favicon.ico).*)',
  ],
}; 