import dynamic from 'next/dynamic'
import Skeleton from '@shared/Skeleton'

import Account from '@components/home/Account'
import { EventBannersSkeleton } from '@components/home/EventBanners'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <EventBannersSkeleton />,
})
export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
    </>
  )
}
