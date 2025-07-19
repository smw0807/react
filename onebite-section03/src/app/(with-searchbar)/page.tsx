import { Suspense } from 'react';
import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { delay } from '@/utils/delay';

// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제로 Static 페이지로 설정(설정하면 안되는 이유-> 빌드 오류)
// export const dynamic = 'force-static';

async function AllBooks() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    // { cache: 'no-store' }
    { cache: 'force-cache' }
  );
  const allBooks: BookData[] = await response.json();
  if (!response.ok) return <div>오류가 발생했습니다...</div>;
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
async function RecoBooks() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } } // 특정 시간을 주기로 캐시를 업데이트함
  );
  const recoBooks: BookData[] = await response.json();
  if (!response.ok) return <div>오류가 발생했습니다...</div>;
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
//현재 페이지는 dynamic 페이지로 설정
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>Loading...</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>Loading...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
    // <div className={styles.page}>
    //   인덱스 페이지
    //   {/* 클라이언트 컴포넌트에 서버 컴포넌트를 import하지 않고, children으로 전달하는게 나음. import하면 서버컴포넌트가 클라이언트 컴포넌트로 변경됨*/}
    //   <ClientComponent>
    //     <ServerComponent />
    //   </ClientComponent>
    // </div>
  );
}
