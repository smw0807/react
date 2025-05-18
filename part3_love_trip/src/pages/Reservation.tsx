import { useEffect } from 'react'
import { parse } from 'qs'
import { useNavigate } from 'react-router-dom'

import Summary from '@/components/reservation/Summary'
import Spacing from '@/components/shared/Spacing'
import Form from '@/components/reservation/Form'

import useReservation from '@/components/reservation/hooks/useReservation'
import addDelimiter from '@/utils/addDelimiter'
import useUser from '@/hooks/auth/useUser'

function ReservationPage() {
  const user = useUser()
  const navigate = useNavigate()

  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  ) as {
    startDate: string
    endDate: string
    nights: string
    roomId: string
    hotelId: string
  }

  useEffect(() => {
    if ([startDate, endDate, nights, roomId, hotelId].some((v) => v == null)) {
      window.history.back()
    }
  }, [startDate, endDate, nights, roomId, hotelId])

  const { data, isLoading, makeReservation } = useReservation({
    hotelId,
    roomId,
  })

  if (data == null || isLoading) {
    return null
  }

  const { hotel, room } = data

  const price = room.price * Number(nights)

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    console.log(formValues)
    const reservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price,
      formValues,
    }

    await makeReservation(reservation)

    navigate(`/reservation/done?hotelName=${hotel.name}`)
  }

  const buttonLabel = `${nights}박 ${addDelimiter(price)}원 예약하기`

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />

      <Spacing size={8} backgroundColor="gray100" />

      <Form
        forms={hotel.form}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage
