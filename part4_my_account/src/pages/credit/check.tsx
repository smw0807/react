import { useState } from 'react'
import { useMutation } from 'react-query'

import FullPageLoader from '@shared/FullPageLoader'
import FixedBottomButton from '@shared/FixedBottomButton'

import { useAlertContext } from '@/contexts/AlertContext'
import useCreditCheck from '@/components/credit/hooks/useCreditCheck'
import { CHECK_STATUS } from '@/constants/credit'
import useUser from '@/hooks/useUser'
import { updateCredit } from '@/remote/credit'

function CreditCheckPage() {
  const { open } = useAlertContext()
  const [readyToPoll, setReadyToPoll] = useState(true)
  const user = useUser()

  const { mutate } = useMutation((creditScore: number) =>
    updateCredit({
      userId: user?.id as string,
      creditScore,
    }),
  )
  const { data: status } = useCreditCheck({
    onSuccess: (creditScore) => {
      setReadyToPoll(false)
      mutate(creditScore)
    },
    onError: () => {
      setReadyToPoll(false)
      open({
        title: '신용점수 조회에 실패했어요.',
        description: '잠시 후 다시 시도해주세요.',
        onButtonClick: () => {
          window.history.back()
        },
      })
    },
    enabled: readyToPoll,
  })
  return (
    <div>
      <FullPageLoader
        message={STATUS_CHECK_MESSAGE[status ?? CHECK_STATUS.READY]}
      />
      {status === CHECK_STATUS.COMPLETE ? (
        <FixedBottomButton
          label="확인"
          onClick={() => {
            window.history.back()
          }}
        />
      ) : null}
    </div>
  )
}

const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.READY]: '신용점수 조회를 위해 정보를 준비하고있어요.',
  [CHECK_STATUS.PROGRESS]: '신용점수 조회 중입니다. 잠시만 기다려주세요',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다.',
}

export default CreditCheckPage
