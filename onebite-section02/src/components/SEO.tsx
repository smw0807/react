import Head from 'next/head';
export default function SEO({
  title,
  image,
  description,
}: {
  title?: string;
  image?: string;
  description?: string;
}) {
  return (
    <Head>
      <title>{title ? `${title}` : '한입북스'}</title>
      <meta property="og:image" content={image ? image : '/thumbnail.png'} />
      <meta property="og:title" content={title ? title : '한입북스'} />
      <meta
        property="og:description"
        content={
          description ? description : '한입북스에 등록된 도서들을 만나보세요'
        }
      />
    </Head>
  );
}
