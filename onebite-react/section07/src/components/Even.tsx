import { useEffect } from 'react';
export default function Even() {
  useEffect(() => {
    // clean up, useEffect 종료 시 실행
    return () => {
      console.log('Even 컴포넌트 언마운트');
    };
  }, []);
  return <div>짝수입니다.</div>;
}
