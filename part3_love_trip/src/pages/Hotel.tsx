import useHotel from '@/components/hotel/hooks/useHotel'
import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'

import Top from '@shared/Top'
import Carousel from '@/components/hotel/Carousel'
import Contents from '@/components/hotel/Contents'
import Rooms from '@/components/hotel/Rooms'
import Map from '@/components/hotel/Map'
import RecommendHotels from '@/components/hotel/RecommendHotels'
import ActionButtons from '@/components/hotel/ActionButtons'
import Review from '@/components/hotel/Review'
import ScrollProgressbar from '@shared/ScrollProgressbar'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>Loading...</div>
  }

  const { name, comment, images, contents, location, recommendHotel } = data

  return (
    <div>
      <ScrollProgressbar style={ScrollProgressbarStyle} />
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
      <ActionButtons hotel={data} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommendHotels recommendHotel={recommendHotel} />
      <Review hotelId={id} />
    </div>
  )
}

const ScrollProgressbarStyle = css`
  position: sticky;
  top: 64px;
  z-index: 2;
`
export default HotelPage
