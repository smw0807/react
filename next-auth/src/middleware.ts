import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/constants/token';
import { verifyToken, refreshToken } from '@/apis/auth';
import { setToken } from '@/utils/token';
//토큰 검증
async function handleVerifyToken(token: string) {
  const response = await verifyToken(token);
  const data = await response.json();
  if (data.success) {
    return true;
  }
  return false;
}

async function handleRefreshToken(token: string) {
  const response = await refreshToken(token);
  const data = await response.json();

  if (data.success) {
    await setToken('access', data.token.access_token);
    await setToken('refresh', data.token.refresh_token);
    return true;
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const requestUrl = request.nextUrl.pathname;
  if (!requestUrl.startsWith('/login')) {
    const accessToken = request.cookies.get(ACCESS_TOKEN_NAME);
    const refreshToken = request.cookies.get(REFRESH_TOKEN_NAME);

    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (accessToken?.value) {
      // 토큰 검증
      const isVerified = await handleVerifyToken(accessToken?.value);
      if (!isVerified && refreshToken?.value) {
        // 토큰 재발급
        const isRefreshed = await handleRefreshToken(refreshToken?.value);
        if (!isRefreshed) {
          return NextResponse.redirect(new URL('/login', request.url));
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로를 매칭합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ic).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
};
