import { useQuery } from 'react-query'
import { getRecommendHotels } from '@/remote/hotel'

function useRecommendHotels({ hotelIds }: { hotelIds: string[] }) {
  return useQuery(
    ['recommendHotels', JSON.stringify(hotelIds)],
    () => getRecommendHotels(hotelIds),
    {
      // hotelIds가 없으면 데이터를 가져오지 않음
      enabled: hotelIds.length > 0,
    },
  )
}

export default useRecommendHotels
