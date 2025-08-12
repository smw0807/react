import { useCookies } from 'react-cookie';
import { verifyToken, refreshToken } from '../api/auth';

export interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
  partitioned?: boolean;
}

export const ACCESS_TOKEN_NAME = import.meta.env.VITE_ACCESS_TOKEN_NAME;
export const REFRESH_TOKEN_NAME = import.meta.env.VITE_REFRESH_TOKEN_NAME;

export type TokenType = 'access' | 'refresh';

export default function useToken() {
  const [cookies, setCookie] = useCookies();

  const setToken = (
    type: TokenType,
    token: string,
    options?: CookieSetOptions
  ) => {
    setCookie(
      type === 'access' ? ACCESS_TOKEN_NAME : REFRESH_TOKEN_NAME,
      token,
      options
    );
  };

  const getToken = (type: TokenType) => {
    return cookies[type === 'access' ? ACCESS_TOKEN_NAME : REFRESH_TOKEN_NAME];
  };

  const removeToken = (type: TokenType) => {
    setCookie(type === 'access' ? ACCESS_TOKEN_NAME : REFRESH_TOKEN_NAME, '', {
      expires: new Date(0),
    });
  };

  // 토큰 검증
  const verify = async (token: string) => {
    const res = await verifyToken(token);
    const { message, success } = await res.json();
    console.log('message : ', message);
    if (success) {
      return true;
    }
    return false;
  };

  // 토큰 재발급
  const refresh = async (token: string) => {
    const res = await refreshToken(token);
    const { message, success, token: newToken } = await res.json();
    console.log('message : ', message);
    if (success) {
      setToken('access', newToken.access_token);
      setToken('refresh', newToken.refresh_token);
      return true;
    }
    return false;
  };

  return { setToken, getToken, removeToken, verify, refresh };
}
