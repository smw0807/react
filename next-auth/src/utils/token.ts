import { cookies } from 'next/headers';

type TokenType = 'access' | 'refresh';
const ACCESS_TOKEN_NAME =
  (process.env.NEXT_PUBLIC_ACCESS_TOKEN as string) || '';
const REFRESH_TOKEN_NAME =
  (process.env.NEXT_PUBLIC_REFRESH_TOKEN as string) || '';

// 토큰 가져오기
export const getToken = async (type: TokenType) => {
  const cookieStore = await cookies();
  return cookieStore.get(
    type === 'access' ? ACCESS_TOKEN_NAME : REFRESH_TOKEN_NAME
  )?.value;
};

// 토큰 저장
export const setToken = async (type: TokenType, token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(
    type === 'access' ? ACCESS_TOKEN_NAME : REFRESH_TOKEN_NAME,
    token
  );
};

// 토큰 삭제
export const removeToken = async (type: TokenType) => {
  const cookieStore = await cookies();
  cookieStore.delete(
    type === 'access' ? ACCESS_TOKEN_NAME : REFRESH_TOKEN_NAME
  );
};
