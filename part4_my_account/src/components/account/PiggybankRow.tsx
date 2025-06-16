import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { differenceInDays } from 'date-fns'

import withSuspense from '@/hooks/withSuspense'

import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

import { getPiggybanks } from '@/remote/piggybank'
import useUser from '@/hooks/useUser'
import addDelimiter from '@/utils/addDelimiter'

function PiggybankRow() {
  const navigate = useRouter()
  const user = useUser()
  const { data: piggybank } = useQuery(
    ['piggybank', user?.id],
    () => getPiggybanks(user?.id as string),
    {
      suspense: true,
    },
  )

  if (!piggybank) {
    return (
      <div>
        <ul>
          <ListRow
            left={
              <Image
                src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
                width={40}
                height={40}
                alt=""
              />
            }
            content={
              <ListRow.Texts
                title="저금통"
                subtitle="매일 매일 조금씩 저금하여 목표금액을 모아보아요."
              />
            }
            withArrow
            onClick={() => navigate.push('/account/piggybank/new')}
          />
        </ul>
      </div>
    )
  }

  const { endDate, goalAmount, balance } = piggybank
  const dday = differenceInDays(endDate, new Date())

  return (
    <div>
      <ul>
        <ListRow
          left={
            <Image
              src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
              width={40}
              height={40}
              alt=""
            />
          }
          content={
            <Flex direction="column">
              <Text typography="t4">D-{dday}</Text>
              <Text>{addDelimiter(goalAmount - balance)}원 남았어요</Text>
            </Flex>
          }
          withArrow
          onClick={() => {}}
        />
      </ul>
    </div>
  )
}
export default withSuspense(PiggybankRow, { fallback: <div>Loading...</div> })
