import { useQuery } from 'react-query'

import { CHECK_STATUS } from '@/constants/credit'

interface useCreditCheckProps {
  onSuccess: (creditScore: number) => void
  onError: () => void
  enabled: boolean
}

function useCreditCheck({ onSuccess, onError, enabled }: useCreditCheckProps) {
  return useQuery(['useCreditCheck'], () => getCheckStatus(), {
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
    onSuccess: (status) => {
      console.log(status)
      if (status === CHECK_STATUS.COMPLETE) {
        onSuccess(getCreditScore(200, 1000))
      }
    },
    onError,
  })
}

function getCheckStatus() {
  const values = [
    CHECK_STATUS.READY,
    CHECK_STATUS.PROGRESS,
    CHECK_STATUS.COMPLETE,
    CHECK_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  if (status === CHECK_STATUS.REJECT) {
    throw new Error('신용점수 조회 실패')
  }

  return status
}

function getCreditScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default useCreditCheck
