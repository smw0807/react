import { Cookies } from 'react-cookie';
const ACCESS_TOKEN_NAME = import.meta.env.VITE_ACCESS_TOKEN_NAME;
const REFRESH_TOKEN_NAME = import.meta.env.VITE_REFRESH_TOKEN_NAME;

export enum TokenType {
  ACCESS_TOKEN = ACCESS_TOKEN_NAME,
  REFRESH_TOKEN = REFRESH_TOKEN_NAME,
}
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
  if (name === TokenType.ACCESS_TOKEN) {
    cookies.set(ACCESS_TOKEN_NAME, value, options);
  } else if (name === TokenType.REFRESH_TOKEN) {
    cookies.set(REFRESH_TOKEN_NAME, value, options);
  }
};

export const getToken = (name: TokenType) => {
  if (name === TokenType.ACCESS_TOKEN) {
    return cookies.get(ACCESS_TOKEN_NAME);
  } else if (name === TokenType.REFRESH_TOKEN) {
    return cookies.get(REFRESH_TOKEN_NAME);
  }
};

export const clearAllTokens = () => {
  removeToken(TokenType.ACCESS_TOKEN);
  removeToken(TokenType.REFRESH_TOKEN);
};

export const removeToken = (name: TokenType) => {
  if (name === TokenType.ACCESS_TOKEN) {
    cookies.remove(ACCESS_TOKEN_NAME);
  } else if (name === TokenType.REFRESH_TOKEN) {
    cookies.remove(REFRESH_TOKEN_NAME);
  }
};

export const hasToken = () => {
  const accessToken = getToken(TokenType.ACCESS_TOKEN);
  const refreshToken = getToken(TokenType.REFRESH_TOKEN);
  return accessToken && refreshToken;
};
