import ListRow from '@shared/ListRow'

import useReservations from '@/components/reservation-list/hooks/useReservations'

function ReservationListPage() {
  const { data, isLoading } = useReservations()

  console.log(data)
  if (data == null || isLoading) {
    return null
  }

  return (
    <div>
      {data.map(({ hotel, reservation }) => (
        <ListRow
          key={reservation.id}
          left={
            <img
              src={hotel.mainImageUrl}
              alt={hotel.name}
              width={80}
              height={80}
            />
          }
          content={
            <ListRow.Texts
              title={hotel.name}
              subtitle={`${reservation.startDate} ~ ${reservation.endDate}`}
            />
          }
        />
      ))}
    </div>
  )
}

export default ReservationListPage
