// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import styles from './[id].module.css';
import fetchOneBook from '@/lib/fetch-one-book';

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } }, //value는 문자열만 가능함
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    //대체, 대비책, 보험, 위에 작성한 1~3외의 경로가 들어올 경우 처리할 로직
    fallback: false, //false: 404 페이지 반환
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
