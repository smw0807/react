import ClientComponent from '@/components/client-component';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  console.log(q);

  return (
    <div>
      Search Page : {q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
