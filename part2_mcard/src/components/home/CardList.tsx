import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import flatten from 'lodash.flatten'
import { useNavigate } from 'react-router-dom'
import { getCards } from '@remote/card'

import ListRow from '@shared/ListRow'
import Badge from '@shared/Badge'

function CardList() {
  const navigate = useNavigate()
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
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, idx) => (
            <ListRow
              key={card.id}
              content={
                <ListRow.Texts title={`${idx + 1}위`} subtitle={card.name} />
              }
              right={card.payback && <Badge label={card.payback} />}
              withArrow
              onClick={() => {
                navigate(`/card/${card.id}`)
              }}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
