import { Cookies } from 'react-cookie';
const ACCESS_TOKEN_NAME = import.meta.env.VITE_ACCESS_TOKEN_NAME;
const REFRESH_TOKEN_NAME = import.meta.env.VITE_REFRESH_TOKEN_NAME;

type TokenType = 'accessToken' | 'refreshToken';
interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
  partitioned?: boolean;
}

const cookies = new Cookies();

export const setToken = (
  name: TokenType,
  value: string,
  options?: CookieSetOptions
) => {
  cookies.set(name, value, options);
};

export const getToken = (name: TokenType) => {
  return cookies.get(name);
};

export const removeToken = (name: TokenType) => {
  cookies.remove(name);
};

export const updateToken = (
  name: TokenType,
  value: string,
  options?: CookieSetOptions
) => {
  cookies.set(name, value, options);
};

export const clearAllTokens = () => {
  setToken(ACCESS_TOKEN_NAME, '', { expires: new Date(0) });
  setToken(REFRESH_TOKEN_NAME, '', { expires: new Date(0) });
};

export const hasToken = () => {
  const accessToken = getToken(ACCESS_TOKEN_NAME);
  const refreshToken = getToken(REFRESH_TOKEN_NAME);
  return accessToken && refreshToken;
};
