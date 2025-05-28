import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { css } from '@emotion/react'

import useEventBanners from './hooks/useEventBanners'
import withSuspense from '../shared/hooks/withSuspense'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Skeleton from '@shared/Skeleton'

function EventBanners() {
  const { data } = useEventBanners()
  console.log(data)
  return (
    <div style={{ padding: 24 }}>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link href={banner.link}>
              <Flex
                style={{ backgroundColor: banner.backgroundColor }}
                justify="space-between"
                css={BannerStyles}
              >
                <Flex direction="column">
                  <Text bold>{banner.title}</Text>
                  <Text typography="t6">{banner.subTitle}</Text>
                </Flex>
                <Image
                  alt="banner"
                  src={banner.iconUrl}
                  width={40}
                  height={40}
                />
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const BannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`

export function EventBannersSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
    </div>
  )
}

export default withSuspense(EventBanners, {
  fallback: <EventBannersSkeleton />,
})
