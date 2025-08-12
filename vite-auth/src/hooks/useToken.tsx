import { useCookies } from 'react-cookie';

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

  return { setToken, getToken, removeToken };
}
