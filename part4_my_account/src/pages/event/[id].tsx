import { GetServerSidePropsContext } from 'next'

import { getEvent } from '@/remote/event'

function EventPage({ initialEvent, id }: { initialEvent: Event; id: string }) {
  console.log(initialEvent)
  console.log(id)
  return <div>EventPage</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string }

  const event = await getEvent(id)

  return {
    props: { id, initialEvent: event },
  }
}

export default EventPage
