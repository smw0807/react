import { useToken } from './useToken';

export const useFetch = () => {
  const token = useToken();
  return async (url: string, options?: RequestInit) => {
    console.log(url);
    const headers = {
      'Content-Type': 'application/json',
    };
    // 인증 관련 api가 아닌 경우 토큰 추가
    if (!url.startsWith('/api/auth')) {
      // 쿠키에서 토큰 가져오기
      // const accessToken = token.getToken('access_token');
      // headers['Authorization'] = accessToken;
    }
    const res = await fetch(url, {
      headers,
      ...options,
    });
    return res.json();
  };
};
