import { useQuery } from 'react-query'
import { APPLY_STATE } from '@models/apply'

interface usePollApplyStatusProps {
  onSuccess: () => void
  onError: () => void
  enabled: boolean
}

function usePollApplyStatus({
  onSuccess,
  onError,
  enabled,
}: usePollApplyStatusProps) {
  return useQuery(['applyStatus'], () => getApplyStatus(), {
    enabled,
    refetchInterval: 2000,
    staleTime: 2000,
    onSuccess: (status) => {
      console.log('status', status)
      if (status === APPLY_STATE.COMPLETE) {
        onSuccess()
      }
    },
    onError: () => {
      onError()
    },
  })
}

function getApplyStatus() {
  const values = [
    APPLY_STATE.READY,
    APPLY_STATE.PROGRESS,
    APPLY_STATE.COMPLETE,
    APPLY_STATE.REJECTED,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  if (status === APPLY_STATE.REJECTED) {
    console.log('카드 신청 실패!!!')
    throw new Error('카드 신청 실패')
  }
  return status
}

export default usePollApplyStatus
