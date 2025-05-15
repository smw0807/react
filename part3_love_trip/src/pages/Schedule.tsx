import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import RangePicker from '@shared/RangePicker'
import FixedBottomButton from '@shared/FixedBottomButton'

function SchedulePage() {
  const navigate = useNavigate()

  const { roomId = '', hotelId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  })

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  })

  // 쿼리 파라미터가 없으면 뒤로가기
  useEffect(() => {
    if (roomId == '' || hotelId == '') {
      window.history.back()
    }
  }, [roomId, hotelId])

  const moveToReservationPage = () => {
    const params = qs.stringify({
      hotelId,
      roomId,
      ...selectedDate,
    })
    navigate(`/reservation?${params}`)
  }

  const 제출가능한가 =
    selectedDate.startDate != null && selectedDate.endDate != null

  const buttonLabel = 제출가능한가
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '날짜를 선택해주세요'
  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          })
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={!제출가능한가}
        onClick={moveToReservationPage}
      />
    </div>
  )
}

export default SchedulePage
