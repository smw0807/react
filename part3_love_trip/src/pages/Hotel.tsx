import useHotel from '@/components/hotel/hooks/useHotel'
import { useParams } from 'react-router-dom'

import Top from '@shared/Top'
import Carousel from '@/components/hotel/Carousel'
import Contents from '@/components/hotel/Contents'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>Loading...</div>
  }

  const { name, comment, images, contents } = data

  return (
    <div>
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
      <Contents contents={contents} />
    </div>
  )
}

export default HotelPage
