import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, getRefreshToken } from '~/api/token';

/**
 * 리프레시 토큰 이용해 토큰 갱신
 * @param request
 * @returns
 */
const refreshTokenProcess = async (request: NextRequest) => {
  const refreshToken = request.cookies.get(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!
  );
  if (refreshToken) {
    const user = await verifyToken(refreshToken.value);
    const cookieStore = await cookies();
    if (user.success) {
      const newAccessToken = await getRefreshToken(refreshToken.value);
      // 새로운 토큰 쿠키에 저장
      const response = NextResponse.next();
      response.cookies.set(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!,
        newAccessToken.token.access_token
      );
      response.cookies.set(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!,
        newAccessToken.token.refresh_token
      );
      cookieStore.set(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!,
        newAccessToken.token.access_token
      );
      cookieStore.set(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!,
        newAccessToken.token.refresh_token
      );
      return response;
    } else {
      // 쿠키 제거
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
      response.cookies.delete(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!);
      cookieStore.delete(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
      cookieStore.delete(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!);
      return response;
    }
  }
};

export async function middleware(request: NextRequest) {
  // 루트 페이지 접근 시
  if (request.nextUrl.pathname === '/') {
    // 쿠키에 저장된 토큰 확인
    const accessToken = request.cookies.get(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
    );
    // 토큰 정보가 없으면 login 페이지로 이동
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // 토큰 정보가 있으면 토큰 정보를 이용해 사용자 정보 가져오기
    const user = await verifyToken(accessToken.value);
    if (user.success) {
      const role = user.data.role;
      const url = role === 'ADMIN' ? '/manage/users' : '/user';
      return NextResponse.redirect(new URL(url, request.url));
    }
    // 어세스 토큰 만료 시 리프레시 토큰 이용해 토큰 갱신
    return await refreshTokenProcess(request);
  }

  // 관리자 또는 사용자 페이지 접근 시
  const isAdmin = request.nextUrl.pathname.startsWith('/manage');
  const isUser = request.nextUrl.pathname.startsWith('/user');
  if (isAdmin || isUser) {
    const accessToken = request.cookies.get(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!
    );
    // 토큰 정보가 없으면 login 페이지로 이동
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const user = await verifyToken(accessToken.value);
    if (user.success) {
      if (isAdmin && user.data.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/user', request.url));
      }
      if (isUser && user.data.role !== 'USER') {
        return NextResponse.redirect(new URL('/manage/users', request.url));
      }
      return NextResponse.next();
    }
    // 어세스 토큰 만료 시 리프레시 토큰 이용해 토큰 갱신
    return await refreshTokenProcess(request);
  }

  // todo 권한이 아닌 페이지 접속 시 처리 로직?
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
