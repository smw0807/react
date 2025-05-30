import dynamic from 'next/dynamic'
import Spacing from '@shared/Spacing'

import Account from '@components/home/Account'
import { EventBannersSkeleton } from '@components/home/EventBanners'
import { CreditScoreSkeleton } from '@components/home/CreditScore'
import { CardListSkeleton } from '@components/home/CardList'
const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <EventBannersSkeleton />,
})

const CreditScore = dynamic(() => import('@components/home/CreditScore'), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
})

const CardList = dynamic(() => import('@components/home/CardList'), {
  ssr: false,
  loading: () => <CardListSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <CardList />
    </>
  )
}
