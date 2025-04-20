import Top from '@shared/Top'
import AdBanners from '@components/home/AdBanners'
import CardList from '@components/home/CardList'

function Home() {
  return (
    <div>
      <Top
        title="헤택 좋은 카드"
        subtitle="회원님 위해서 혜택 좋은 카드를 준비했습니다."
      />
      <AdBanners />
      <CardList />
    </div>
  )
}

export default Home
