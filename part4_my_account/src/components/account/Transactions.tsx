import { parseISO, format } from 'date-fns'
import withSuspense from '@/hooks/withSuspense'
import Link from 'next/link'

import useTransactions from './hooks/useTransactions'

import Flex from '../shared/Flex'
import Text from '../shared/Text'
import ListRow from '../shared/ListRow'
import Button from '../shared/Button'

import addDelimiter from '@/utils/addDelimiter'

function Transactions() {
  const { data } = useTransactions({ suspense: true })

  const transactions = data?.pages.flatMap((page) => page.items).slice(0, 5)
  return (
    <div>
      <Text bold style={{ padding: 24 }}>
        입출금 내역
      </Text>
      {transactions?.length === 0 ? (
        <Flex style={{ padding: 24 }}>
          <Text>아직 입출금 내역이 없어요</Text>
        </Flex>
      ) : (
        <>
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
          <Link href="/account/transactions">
            <Button full size="medium">
              자세히보기
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}
export default withSuspense(Transactions, { fallback: <div>Loading...</div> })
