import { useEffect } from 'react'
import { getCards } from '@remote/card'
import { getAdBanners } from '@remote/adBanner'
import Top from '@shared/Top'
function Home() {
  useEffect(() => {
    getCards().then((res) => {
      console.log(res)
    })
    getAdBanners().then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <div>
      <Top
        title="헤택 좋은 카드"
        subtitle="회원님 위해서 혜택 좋은 카드를 준비했습니다."
      />
    </div>
  )
}

export default Home
