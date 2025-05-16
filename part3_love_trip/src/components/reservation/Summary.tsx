import { css } from '@emotion/react'
import { Room } from '@/models/room'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Flex from '@shared/Flex'

interface SummaryProps {
  hotelName: string
  room: Room
  startDate: string
  endDate: string
  nights: string
}
function Summary({
  hotelName,
  room,
  startDate,
  endDate,
  nights,
}: SummaryProps) {
  return (
    <div style={{ padding: 24 }}>
      <Text typography="t4" bold>
        {hotelName}
      </Text>

      <Spacing size={8} />

      <img src={room.imageUrl} alt={room.roomName} css={ImageStyles} />

      <Spacing size={16} />

      <div>
        <Text bold>{room.roomName}</Text>

        <Spacing size={4} />

        <ul css={ListStyles}>
          <Flex as="li" justify="space-between">
            <Text color="gray600" typography="t6">
              일정
            </Text>
            <Text typography="t6">{`${startDate} ~ ${endDate} (${nights}박)`}</Text>
          </Flex>

          {Object.entries(room.basicInfo).map(([key, value]) => {
            if (key in INFO_LABEL_MAP) {
              return (
                <Flex key={key} as="li" justify="space-between">
                  <Text color="gray600" typography="t6">
                    {INFO_LABEL_MAP[key as keyof typeof INFO_LABEL_MAP]}
                  </Text>
                  <Text typography="t6">{value}</Text>
                </Flex>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}

const INFO_LABEL_MAP = {
  bed: '침대',
  squareMeter: '면적',
  maxOccupancy: '최대 인원',
  smoke: '흡연여부',
}

const ImageStyles = css`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`

const ListStyles = css`
  li:not(:last-child) {
    margin-bottom: 8px;
  }
`
export default Summary
