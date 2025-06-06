import InfiniteScroll from 'react-infinite-scroll-component'
import useHotels from '@/components/hotelList/hooks/useHotels'

import Top from '@shared/Top'
import HotelItem from '@/components/hotelList/HotelItem'
import { Fragment } from 'react'
import Spacing from '@shared/Spacing'
import withSuspense from '@shared/hocs/withSuspense'

import useLike from '@/hooks/like/useLike'

function HotelList() {
  const { data: hotels, hasNextPage, loadMore } = useHotels()
  const { data: likes, mutate: like } = useLike()
  return (
    <div>
      <Top title="인기 호텔" subtitle="호텔부터 펜션까지 최저가"></Top>
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {hotels?.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <HotelItem
                hotel={hotel}
                isLike={Boolean(
                  likes?.find((like) => like.hotelId === hotel.id),
                )}
                onLike={like}
              />

              {hotels.length - 1 === idx ? null : (
                <Spacing
                  size={8}
                  backgroundColor="gray100"
                  style={{ margin: '20px 0' }}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
export default withSuspense(HotelList, {
  fallback: <div>호텔리스트 불러오는 중...</div>,
})
