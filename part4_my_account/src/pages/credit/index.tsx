import { useCallback } from 'react'
import { QueryClient, dehydrate } from 'react-query'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'

import CreditScoreChart from '@shared/CreditScoreChart'
import { useAlertContext } from '@contexts/AlertContext'

import useUser from '@hooks/useUser'
import { getCredit } from '@/remote/credit'
import { User } from '@models/user'
import useCredit from '@/components/credit/hooks/useCredit'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

function CreditPage() {
  const router = useRouter()
  const { open } = useAlertContext()
  const user = useUser()
  const { data } = useCredit()

  const handleCheck = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능이에요',
        description:
          '정확한 신용정보를 확인하기위해 로그인을 먼저 진행해주세요',
        onButtonClick: () => {
          router.push('/auth/signin')
        },
      })
      return
    }
    router.push('/credit/check')
  }, [user, router, open])
  return data != null ? (
    <div>
      <Spacing size={40} />
      <Flex direction="column" align="center">
        <Text typography="t4" bold textAlign="center">
          나의 신용점수
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={data.creditScore} width={100} height={100} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          content={
            <ListRow.Texts
              title="추천 카드"
              subtitle="나에게 맞는 카드 찾아보기"
            />
          }
          withArrow
          onClick={() => {
            router.push('/card')
          }}
        />
      </ul>
      <FixedBottomButton label="신용점수 올리기" onClick={handleCheck} />
    </div>
  ) : (
    <div>
      <Spacing size={40} />
      <Flex direction="column" align="center">
        <Text typography="t4" bold textAlign="center">
          내 신용점수를 <br /> 조회하고 관리해보세요.
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} width={100} height={100} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          content={
            <ListRow.Texts
              title="정호가한 신용평점"
              subtitle="대표 신용평가 기관의 데이터로 관리해요"
            />
          }
        />
        <ListRow
          content={
            <ListRow.Texts
              title="신용점수 무료조회"
              subtitle="신용점수에 영향없이 무료로 조회가 가능해요"
            />
          }
        />
      </ul>
      <FixedBottomButton
        label="30초만에 신용점수 조회하기"
        onClick={handleCheck}
      />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (session != null && session.user != null) {
    const client = new QueryClient()
    await client.prefetchQuery(['credit', (session.user as User).id], () =>
      getCredit((session.user as User).id),
    )
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {}
}

export default CreditPage
