import { useCookies } from 'next-client-cookies';
type TokenName = 'access_token' | 'refresh_token';
export const useToken = () => {
  const cookies = useCookies();

  const setToken = (name: TokenName, token: string, options?: any) => {
    if (name === 'access_token') {
      cookies.set(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!, token, options);
    } else {
      cookies.set(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!, token, options);
    }
  };

  const removeToken = (name: TokenName | 'all') => {
    if (name === 'access_token') {
      cookies.remove(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    } else if (name === 'refresh_token') {
      cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!);
    } else {
      cookies.remove(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
      cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!);
    }
  };

  const getToken = (name: TokenName) => {
    if (name === 'access_token') {
      return cookies.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    } else {
      return cookies.get(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!);
    }
  };

  return { setToken, getToken, removeToken };
};
