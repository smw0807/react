// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import SearchableLayout from '@/components/searchable-layout';

import fetchBooks from '@/lib/fetch-books';
import BookItem from '@/components/book-item';
import SEO from '@/components/SEO';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BookData } from '@/types';

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const books = await fetchBooks(q as string);
    setBooks(books);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <>
      <SEO title="한입북스 - 검색결과" />
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}
// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: {
//       books,
//     },
//   };
// };
// export default function Page({
//   books,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <div>
//       {books.map((book) => (
//         <BookItem key={book.id} {...book} />
//       ))}
//     </div>
//   );
// }

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
