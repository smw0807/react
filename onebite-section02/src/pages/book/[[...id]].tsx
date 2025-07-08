import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  console.log(router.query);
  // http://localhost:3000/book/1
  const { id } = router.query;
  return <h1>Book {id}</h1>;
}
