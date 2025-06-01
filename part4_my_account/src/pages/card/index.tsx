import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

import { getCards } from '@remote/card'
import ListRow from '@shared/ListRow'
import Badge from '@shared/Badge'

function CardListPage() {
  const navigate = useRouter()
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  const loadMore = useCallback(() => {
    if (hasNextPage == false || isFetching) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  if (data == null) {
    return null
  }
  const cards = data?.pages.map(({ items }) => items).flat()
  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => (
            <ListRow
              key={card.id}
              content={
                <ListRow.Texts title={`${index + 1})위`} subtitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export function getServerSideProps() {
  const client = new QueryClient()

  client.prefetchInfiniteQuery(['cards'], () => getCards())
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}
export default CardListPage
