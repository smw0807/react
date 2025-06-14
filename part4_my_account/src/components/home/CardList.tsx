import { useRouter } from 'next/router'

import withSuspense from '@/hooks/withSuspense'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Badge from '@shared/Badge'
import Button from '@shared/Button'
import Skeleton from '@shared/Skeleton'

import useCards from './hooks/useCards'

function CardList() {
  const router = useRouter()
  const { data } = useCards()

  const isShowMoreButton = data?.items.length ?? 0 > 5
  return (
    <div style={{ padding: 24 }}>
      <Text bold style={{ padding: '12px 24px', display: 'inline-block' }}>
        추천 카드
      </Text>
      <ul>
        {data?.items
          .slice(0, 5)
          .map((card, index) => (
            <ListRow
              key={card.id}
              content={
                <ListRow.Texts title={`${index + 1})위`} subtitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow
              onClick={() => router.push(`/card/${card.id}`)}
            />
          ))}
      </ul>
      {isShowMoreButton && (
        <div style={{ padding: '12px 24px 0 24px' }}>
          <Button full weak size="medium" onClick={() => router.push('/card')}>
            더보기
          </Button>
        </div>
      )}
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Text bold style={{ padding: '12px 24px', display: 'inline-block' }}>
        추천 카드
      </Text>
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <ListRow
            key={index}
            content={
              <ListRow.Texts
                title={<Skeleton width={30} height={25} />}
                subtitle={<Skeleton width={45} height={20} />}
              />
            }
          />
        ))}
      </ul>
    </div>
  )
}

export default withSuspense(CardList, { fallback: <CardListSkeleton /> })
