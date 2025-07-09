import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import type { AppProps } from 'next/app';

import '@/styles/globals.css';

/**
 * 모든 페이지에 적용되는 부모 컴포넌트
 * root 컴포넌트 역할
 * Component : 현재 페이지 역할을 할 컴포넌트를 받음
 * pageProps : 현재 페이지에 전달된 props를 받음
 * 헤더나 레이아웃 비즈니스 로직을 여기에서 처리할 수 있음.
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () => {
    router.push('/test');
  };
  useEffect(() => {
    router.prefetch('/test');
  }, [router]);

  return (
    <>
      <header>
        <Link href="/">Home</Link>
        &nbsp;
        <Link href="/search" prefetch={false}>
          {/* prefetch false속성을 사용하면 페이지 이동 시 미리 페이지를 로드하지 않음 */}
          Search
        </Link>
        &nbsp;
        <Link href="/book/1">book/1</Link>
        &nbsp;
        <div>
          <button onClick={onClickButton}>/test페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
