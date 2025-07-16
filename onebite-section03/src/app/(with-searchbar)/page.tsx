import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'no-store' }
    // { cache: 'force-cache' }
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
export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
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
