import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { flatten } from 'lodash'
import { getCards } from '@remote/card'

import ListRow from '@shared/ListRow'

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
    },
  )

  const loadMore = useCallback(() => {
    if (hasNextPage == false || isFetching) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (!data) return null

  const cards = flatten(data.pages.map(({ items }) => items))

  return (
    <div>
      <button onClick={() => fetchNextPage()}>데이터 불러오기</button>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
        {cards.map((card, idx) => (
          <ListRow
            key={card.id}
            content={
              <ListRow.Texts title={`${idx + 1}위`} subtitle={card.name} />
            }
            right={card.payback && <div>{card.payback}</div>}
            withArrow
            onClick={() => {}}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default CardList
