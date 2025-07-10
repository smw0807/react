import { useRouter } from 'next/router';
import SearchableLayout from '@/components/searchable-layout';

export default function Page() {
  const router = useRouter();

  //http://localhost:3000/search?q=minwoo
  const { q } = router.query;

  return <h1>Search {q}</h1>;
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
