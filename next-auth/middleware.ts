import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('middleware');
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
