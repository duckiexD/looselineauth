// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware:', {
    path: request.nextUrl.pathname,
    method: request.method,
  });
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/auth/:path*',
};