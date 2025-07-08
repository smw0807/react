import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  //http://localhost:3000/search?q=minwoo
  const { q } = router.query;

  return <h1>Search {q}</h1>;
}
