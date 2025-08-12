import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { login, verifyToken, refreshToken } from '../api/auth';

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
  const navigate = useNavigate();

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
    try {
      const res = await verifyToken(token);
      const { message, success } = await res.json();
      console.log('message : ', message);
      if (success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  // 토큰 재발급
  const refresh = async (token: string) => {
    try {
      const res = await refreshToken(token);
      const { message, success, token: newToken } = await res.json();
      console.log('message : ', message);
      if (success) {
        setToken('access', newToken.access_token);
        setToken('refresh', newToken.refresh_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  // 로그인
  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await login(email, password);
      const { message, success, token } = await res.json();
      console.log('message : ', message);
      if (success) {
        setToken('access', token.access_token);
        setToken('refresh', token.refresh_token);
        navigate('/');
      } else {
        alert(message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  // 로그아웃
  const handleLogout = () => {
    removeToken('access');
    removeToken('refresh');
    navigate('/login');
  };

  // 토큰 체크 및 자동 리다이렉트
  const checkAuth = async () => {
    const accessToken = getToken('access');
    const refreshTokenValue = getToken('refresh');

    if ((!accessToken && !refreshTokenValue) || !refreshTokenValue) {
      console.log('navigate to login');
      navigate('/login');
      return;
    }

    if (accessToken) {
      const isValid = await verify(accessToken);
      if (!isValid) {
        const refreshSuccess = await refresh(refreshTokenValue);
        if (!refreshSuccess) {
          navigate('/login');
          return;
        }
      }
    } else {
      refresh(refreshTokenValue);
    }

    return true;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { setToken, getToken, handleLogin, handleLogout, checkAuth };
}
