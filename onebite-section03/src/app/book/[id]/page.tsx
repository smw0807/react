import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BookData, ReviewData } from '@/types';
import style from './page.module.css';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';

// export const dynamicParams = false;

// 빌드 타임에 미리 생성할 파라미터 목록을 정의하는 함수
export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );
  if (!response.ok) {
    throw new Error(`Book fetch failed : ${response.statusText}`);
  }
  const books: BookData[] = await response.json();
  return books.map((book) => ({ id: book.id.toString() }));
}

async function BookDetail({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    {
      next: {
        tags: [`review-${id}`],
      },
    }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }
  const book: BookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          alt={`도서 ${title}의 표지 이미지`}
          width={240}
          height={300}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {
      next: {
        tags: [`review-list-${bookId}`],
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  if (!response.ok) {
    throw new Error(`Book fetch failed : ${response.statusText}`);
  }
  const book: BookData = await response.json();
  const { title, description, coverImgUrl } = book;
  return {
    title: `${title} - 한입북스`,
    description: `${description}`,
    openGraph: {
      title: `${title} - 한입북스`,
      description: `${description}`,
      images: [coverImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail id={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
