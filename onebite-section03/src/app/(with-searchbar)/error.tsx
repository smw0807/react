'use client';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';
export default function Error({
  error,
  reset, // 에러가 발생한 페이지를 복구하기 위해서 다시 한 번 컴포넌트를 렌더링하는 함수
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      {/* <button onClick={() => reset()}>다시 시도</button> */}
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); //현재 페이지에 필요한 서버컴포넌트를 다시 불러옴 (에러 상태를 초기화하진 않음) (비동기임)
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
