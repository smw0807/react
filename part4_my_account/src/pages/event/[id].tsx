import { GetServerSidePropsContext } from 'next'
import { useQuery } from 'react-query'
import { isAfter, parseISO } from 'date-fns'

import Preview from '@/components/event/Preview'
import { useAlertContext } from '@/contexts/AlertContext'

import { getEvent } from '@/remote/event'

function EventPage({ initialEvent, id }: { initialEvent: Event; id: string }) {
  const { open } = useAlertContext()
  const { data } = useQuery(['event', id], () => getEvent(id), {
    initialData: initialEvent,
    onSuccess: (event) => {
      const isExpired = isAfter(new Date(), parseISO(event.endDate))
      if (isExpired) {
        open({
          title: `${event.title} 이벤트가 종료되었습니다.`,
          description: '다음에 더 좋은 이벤트로 찾아오겠습니다.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      }
    },
  })
  if (data == null) {
    return null
  }

  return <Preview data={data} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string }

  const event = await getEvent(id)

  return {
    props: { id, initialEvent: event },
  }
}

export default EventPage
