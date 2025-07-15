import BookItem from '@/components/book-item';
import style from './page.module.css';
import books from '@/mock/books.json';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
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
