import { Html, Head, Main, NextScript } from 'next/document';
/**
 * 모든 페이지에 공통적으로 적용되어야하는 html 코드를 설정하는 컴포넌트
 * react의 index.html 파일 역할
 * 메타데이터 설정, 외부 스타일 링크, 서드파티 스크립트 등을 설정할 수 있음.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
