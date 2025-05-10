import { useState } from 'react'
import { css } from '@emotion/react'

import useRecommendHotels from '@/components/hotel/hooks/useRecommendHotels'

import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'

import addDelimiter from '@/utils/addDelimiter'
function RecommendHotels({ recommendHotel }: { recommendHotel: string[] }) {
  const { data, isLoading } = useRecommendHotels({ hotelIds: recommendHotel })

  const [showMore, setShowMore] = useState(false)

  if (data == null || isLoading) {
    return null
  }

  const 호텔리스트 = data.length < 3 || showMore ? data : data.slice(0, 3)

  return (
    <div style={{ margin: '24px 0' }}>
      <Text bold typography="t4" style={{ padding: '0 24px' }}>
        추천 호텔
      </Text>
      <Spacing size={16} />
      <ul>
        {호텔리스트.map((hotel) => (
          <ListRow
            key={hotel.id}
            left={
              <img
                src={hotel.mainImageUrl}
                alt={hotel.name}
                css={ImageStyles}
              />
            }
            content={
              <ListRow.Texts
                title={hotel.name}
                subtitle={`${addDelimiter(hotel.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {data.length > 3 && showMore === false ? (
        <div style={{ padding: '0 24px', marginTop: 16 }}>
          <Button
            full
            weak
            onClick={() => {
              setShowMore(true)
            }}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

const ImageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default RecommendHotels
