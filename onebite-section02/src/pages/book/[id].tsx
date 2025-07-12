// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import styles from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } }, //value는 문자열만 가능함
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    //대체, 대비책, 보험, 위에 작성한 1~3외의 경로가 들어올 경우 처리할 로직
    // fallback: false, //false: 404 페이지 반환
    // fallback: 'blocking', //즉시 생성 (Like SSR) / 사전 렌더링해서 브라우저에게 반환해줌
    fallback: true, //true: 즉시 생성 + 페이지만 미리 반환 / ui를 먼저 렌더링해서 보내준 후 데이터가 준비되면 데이터를 받아서 렌더링함
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return '로딩중...';
  }
  if (!book) {
    return '문제가 발생했습니다. 다시 시도하세요.';
  }
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <div className={styles.container}>
      <div
        className={styles.cover_img_container}
        style={{ backgroundImage: `url(${coverImgUrl})` }}
      >
        <img src={coverImgUrl} alt={title} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.author}>
        {author} | {publisher}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context.params!.id;
//   const book = await fetchOneBook(Number(id));
//   return {
//     props: {
//       book,
//     },
//   };
// };

// export default function Page({
//   book,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   if (!book) {
//     return '문제가 발생했습니다. 다시 시도하세요.';
//   }
//   const { title, subTitle, description, author, publisher, coverImgUrl } = book;
//   return (
//     <div className={styles.container}>
//       <div
//         className={styles.cover_img_container}
//         style={{ backgroundImage: `url(${coverImgUrl})` }}
//       >
//         <img src={coverImgUrl} alt={title} />
//       </div>
//       <div className={styles.title}>{title}</div>
//       <div className={styles.subTitle}>{subTitle}</div>
//       <div className={styles.author}>
//         {author} | {publisher}
//       </div>
//       <div className={styles.description}>{description}</div>
//     </div>
//   );
// }
