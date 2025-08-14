import { useCookies } from 'next-client-cookies';

type TokenType = 'access' | 'refresh';
const ACCESS_TOKEN_NAME =
  (process.env.NEXT_PUBLIC_ACCESS_TOKEN as string) || '';
const REFRESH_TOKEN_NAME =
  (process.env.NEXT_PUBLIC_REFRESH_TOKEN as string) || '';

export default function useToken() {
  const cookies = useCookies();
  return {
    getToken: (type: TokenType) =>
      cookies.get(type === 'access' ? ACCESS_TOKEN_NAME : REFRESH_TOKEN_NAME),
    setToken: (type: TokenType, token: string) =>
      cookies.set(
        type === 'access' ? ACCESS_TOKEN_NAME : REFRESH_TOKEN_NAME,
        token
      ),
    removeToken: (type: TokenType) =>
      cookies.remove(
        type === 'access' ? ACCESS_TOKEN_NAME : REFRESH_TOKEN_NAME
      ),
  };
}
