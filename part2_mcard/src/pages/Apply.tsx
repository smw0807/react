import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'

import { useAlertContext } from '@contexts/AlertContext'
import { updateApplyCard } from '@remote/apply'
import { APPLY_STATE } from '@models/apply'
import useUser from '@hooks/auth/useUser'
import PullPageLoader from '@shared/PullPageLoader'

function ApplyPage() {
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams()

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id as string,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }
        if (applied.status === APPLY_STATE.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        cardId: id as string,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATE.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      await updateApplyCard({
        cardId: id as string,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATE.REJECTED,
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })
  const { mutate, isLoading } = useApplyCardMutation({
    onSuccess: () => {
      // 값이 추가되었을 때 => 폴링 시작
      setReadyToPoll(true)
    },
    onError: () => {
      // 실패했을 때 => 폴링 시작
      window.history.back()
    },
  })

  if (data != null && data.status === APPLY_STATE.COMPLETE) {
    return null
  }

  if (readyToPoll || isLoading) {
    return <PullPageLoader message="카드를 신청중입니다." />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
