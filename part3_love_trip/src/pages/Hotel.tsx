import useHotel from '@/components/hotel/hooks/useHotel'
import { useParams } from 'react-router-dom'

import Top from '@shared/Top'
import Carousel from '@/components/hotel/Carousel'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>Loading...</div>
  }

  const { name, comment, images } = data

  return (
    <div>
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
    </div>
  )
}

export default HotelPage
