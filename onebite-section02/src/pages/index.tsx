// import { InferGetServerSidePropsType } from 'next';
import { InferGetStaticPropsType } from 'next';

import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';

import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

import BookItem from '@/components/book-item';

// // 서버 사이드 렌더링
// export const getServerSideProps = async () => {
//   // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
//   const [allBooks, randomBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);
//   return {
//     props: {
//       allBooks,
//       randomBooks,
//     },
//   };
// };

// export default function Home({
//   allBooks,
//   randomBooks,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <div className={styles.container}>
//       <section>
//         <h3>지금 추천하는 도서</h3>
//         {randomBooks.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//       <section>
//         <h3>등록된 모든 도서</h3>
//         {allBooks.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//     </div>
//   );
// }

// SSG
export const getStaticProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  console.log('getStaticProps');
  const [allBooks, randomBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  return {
    props: {
      allBooks,
      randomBooks,
    },
    revalidate: 3, // 3초마다 다시 렌더링, ISR
  };
};

export default function Home({
  allBooks,
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {randomBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
