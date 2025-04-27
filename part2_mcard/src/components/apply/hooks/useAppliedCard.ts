import { useQuery, UseQueryOptions } from 'react-query'
import { getApplyCard } from '@remote/apply'
import { ApplyValues } from '@models/apply'

function useAppliedCard({
  userId,
  cardId,
  options,
}: {
  userId: string
  cardId: string
  options?: Pick<
    UseQueryOptions<ApplyValues | null>,
    'onSuccess' | 'onError' | 'suspense'
  >
}) {
  return useQuery(
    ['applied', userId, cardId],
    () => getApplyCard({ userId, cardId }),
    {
      ...options,
    },
  )
}

export default useAppliedCard
