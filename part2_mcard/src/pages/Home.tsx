import { Suspense } from 'react'
import Top from '@shared/Top'
import AdBanners from '@components/home/AdBanners'
import CardList from '@components/home/CardList'
import ListRow from '@shared/ListRow'

function Home() {
  return (
    <div>
      <Top
        title="헤택 좋은 카드"
        subtitle="회원님 위해서 혜택 좋은 카드를 준비했습니다."
      />
      <AdBanners />
      <Suspense
        fallback={[...new Array(10)].map((_, idx) => (
          <ListRow.Skeleton key={idx} />
        ))}
      >
        <CardList />
      </Suspense>
    </div>
  )
}

export default Home
