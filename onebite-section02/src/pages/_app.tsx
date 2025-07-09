import type { AppProps } from 'next/app';

import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';

/**
 * 모든 페이지에 적용되는 부모 컴포넌트
 * root 컴포넌트 역할
 * Component : 현재 페이지 역할을 할 컴포넌트를 받음
 * pageProps : 현재 페이지에 전달된 props를 받음
 * 헤더나 레이아웃 비즈니스 로직을 여기에서 처리할 수 있음.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}
