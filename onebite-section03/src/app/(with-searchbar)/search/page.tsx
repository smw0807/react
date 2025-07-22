import { Metadata } from 'next';
import { Suspense } from 'react';
import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/utils/delay';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: 'force-cache' }
  );
  if (!response.ok) return <div>오류가 발생했습니다...</div>;
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 현재 페이지 메타 데이터를 동적으로 생성하는 역할을 한다.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `${q} : 한입북스 검색`,
    description: `${q}에 대한 검색 결과입니다.`,
    openGraph: {
      title: `${q} : 한입북스 검색`,
      description: `${q}에 대한 검색 결과입니다.`,
      images: ['/thumbnail.png'],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    // 키 값을 주면 키 값이 변경될 때마다 컴포넌트가 리렌더링 됨
    <Suspense key={q || ''} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ''} />
    </Suspense>
  );
}
