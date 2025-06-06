import { tokenForSSR } from './tokenForSSR';
import { redirect } from 'next/navigation';
import { verifyToken, getRefreshToken } from '~/api/token';

export const fetchForSSR = async () => {
  const token = await tokenForSSR();
  return async (url: string, options?: RequestInit) => {
    const headers = {
      'Content-Type': 'application/json',

      Authorization: '',
    };
    // 인증 관련 api가 아닌 경우 토큰 추가
    if (!url.startsWith('/api/auth') && !url.startsWith('/api/user/signup')) {
      // 쿠키에서 토큰 가져오기
      const accessToken = await token.getToken('access_token');
      if (!accessToken) return redirect('/login');
      // 어세스 토큰 검증
      const user = await verifyToken(accessToken.value);
      if (!user.success) {
        // 토큰 만료 시 리프레시 토큰 이용해 토큰 갱신
        const refreshToken = await token.getToken('refresh_token');
        const newAccessToken = await getRefreshToken(refreshToken!.value);
        if (!newAccessToken.success) return redirect('/login');

        // 새로운 토큰 쿠키에 저장
        await token.setToken('access_token', newAccessToken.token.access_token);
        await token.setToken(
          'refresh_token',
          newAccessToken.token.refresh_token
        );
        headers.Authorization = newAccessToken.token.access_token;
      }

      headers.Authorization = accessToken.value;
    }
    const res = await fetch(process.env.NEXT_API_URL + url, {
      headers,
      ...options,
    });
    return res.json();
  };
};
