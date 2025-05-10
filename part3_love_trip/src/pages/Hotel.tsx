import useHotel from '@/components/hotel/hooks/useHotel'
import { useParams } from 'react-router-dom'

import Top from '@shared/Top'
import Carousel from '@/components/hotel/Carousel'
import Contents from '@/components/hotel/Contents'
import Rooms from '@/components/hotel/Rooms'
import Map from '@/components/hotel/Map'
import RecommendHotels from '@/components/hotel/RecommendHotels'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>Loading...</div>
  }

  const { name, comment, images, contents, location, recommendHotel } = data

  return (
    <div>
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommendHotels recommendHotel={recommendHotel} />
    </div>
  )
}

export default HotelPage
