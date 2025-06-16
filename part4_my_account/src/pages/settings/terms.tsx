import { useMemo } from 'react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'

import useUser from '@/hooks/useUser'
import { getTerms, updateTerms } from '@remote/account'
import { User } from '@/models/user'
import { 약관목록 } from '@/constants/account'

import Top from '@shared/Top'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'

function TermsPage() {
  const user = useUser()
  const client = useQueryClient()
  const { data: terms } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: user != null,
    },
  )
  const { mutate: updateTermsMutation, isLoading } = useMutation(
    (termIds: string[]) => updateTerms(user?.id as string, termIds),
    {
      onSuccess: () => {
        client.invalidateQueries(['terms', user?.id])
      },
      onError: (error) => {
        console.log(error)
      },
    },
  )

  const 동의한약관목록 = useMemo(() => {
    if (terms == null) {
      return null
    }

    const 동의한전체약관목록 = 약관목록.filter((약관) =>
      terms.termIds.includes(약관.id),
    )

    const 필수약관목록 = 동의한전체약관목록.filter((약관) => 약관.mandatory)
    const 선택약관목록 = 동의한전체약관목록.filter((약관) => !약관.mandatory)

    return {
      필수약관목록,
      선택약관목록,
    }
  }, [terms])

  const handleDisagree = (selectedTermId: string) => {
    const updateTermIds = terms?.termIds.filter(
      (termId) => termId !== selectedTermId,
    )

    if (updateTermIds == null) {
      return
    }

    updateTermsMutation(updateTermIds)
  }
  return (
    <div>
      <Top title="약관" subtitle="약관목록 및 철회" />
      {동의한약관목록 == null ? (
        <Text>동의한 약관 목록이 없습니다.</Text>
      ) : (
        <ul>
          {동의한약관목록.필수약관목록.map((term) => {
            return (
              <ListRow
                key={term.id}
                content={
                  <ListRow.Texts title={`[필수] ${term.title}`} subtitle="" />
                }
              />
            )
          })}
          {동의한약관목록.선택약관목록.map((term) => {
            return (
              <ListRow
                key={term.id}
                content={
                  <ListRow.Texts title={`[선택] ${term.title}`} subtitle="" />
                }
                right={
                  <Button
                    onClick={() => handleDisagree(term.id)}
                    disabled={isLoading}
                  >
                    철회
                  </Button>
                }
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['terms', (session.user as User).id], () =>
      getTerms((session.user as User).id as string),
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

export default TermsPage
