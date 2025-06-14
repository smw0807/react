import { useCallback, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { parseISO, format } from 'date-fns'

import withAuth from '@/hooks/withAuth'

import { getTransactions } from '@/remote/transaction'
import { getSession } from 'next-auth/react'
import { User } from '@/models/user'
import useTransactions from '@/components/account/hooks/useTransactions'

import addDelimiter from '@utils/addDelimiter'
import InfiniteScroll from 'react-infinite-scroll-component'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import { TransactionFilterType } from '@/models/transaction'
import { colors } from '@/styles/colorPalette'

const FILTERS: Array<{ label: string; value: TransactionFilterType }> = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '입금',
    value: 'deposit',
  },
  {
    label: '출금',
    value: 'withdraw',
  },
]

function TransactionsPage() {
  const [currentFilter, setCurrentFilter] =
    useState<TransactionFilterType>('all')
  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useTransactions({ suspense: false, filter: currentFilter })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  const transactions = data?.pages.flatMap((page) => page.items) ?? []

  return (
    <div>
      <Flex as="ul" justify="flex-end" style={{ padding: 24 }}>
        {FILTERS.map((filter) => (
          <li
            key={filter.value}
            onClick={() => setCurrentFilter(filter.value)}
            style={{
              cursor: 'pointer',
              padding: 8,
              borderRadius: 4,
              backgroundColor:
                currentFilter === filter.value ? colors.blue100 : colors.white,
              color:
                currentFilter === filter.value ? colors.blue : colors.black,
            }}
          >
            {filter.label}
          </li>
        ))}
      </Flex>
      <InfiniteScroll
        dataLength={transactions.length}
        hasMore={hasNextPage}
        loader={<div></div>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {transactions?.map((transaction) => {
            const 입금인가 = transaction.type === 'deposit'
            return (
              <ListRow
                key={transaction.id}
                content={
                  <ListRow.Texts
                    title={transaction.displayText}
                    subtitle={format(
                      parseISO(transaction.date),
                      'yyyy-MM-dd HH:mm',
                    )}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end">
                    <Text color={입금인가 ? 'blue' : 'red'} bold>
                      {입금인가 ? '+' : '-'}
                      {addDelimiter(transaction.amount)}원
                    </Text>
                    <Text>{addDelimiter(transaction.balance)}원</Text>
                  </Flex>
                }
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchInfiniteQuery(
      ['transactions', (session.user as User)?.id, 'all'],
      () =>
        getTransactions({ userId: (session.user as User)?.id, filter: 'all' }),
    )
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }
  return {
    props: {},
  }
}

export default withAuth(TransactionsPage)
