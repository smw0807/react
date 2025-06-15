import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import withAuth from '@/hooks/withAuth'
import { useMutation } from 'react-query'

import TextField from '@shared/TextField'
import Flex from '@shared/Flex'
import dynamic from 'next/dynamic'
import { Piggybank } from '@/models/piggybank'
import { createPiggybank } from '@/remote/piggybank'
import { useAlertContext } from '@/contexts/AlertContext'

import useUser from '@/hooks/useUser'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

function NewPiggybankPage() {
  const user = useUser()
  const { open } = useAlertContext()
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: 0,
  })

  const { mutate, isLoading } = useMutation(
    (newPiggybank: Piggybank) => createPiggybank(newPiggybank),
    {
      onSuccess: () => {
        open({
          title: '새로운 저금통을 만들었어요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
      onError: () => {
        open({
          title: '저금통 생성에 실패했어요.',
          description: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
    },
  )

  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    const newPiggybank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as Piggybank

    mutate(newPiggybank)
  }

  return (
    <div>
      <Flex direction="column">
        <TextField
          name="name"
          label="저금통 이름"
          value={formValues.name}
          onChange={handleChange}
        />
        <TextField
          name="endDate"
          type="date"
          label="종료일자"
          min={minDate}
          value={formValues.endDate}
          onChange={handleChange}
        />
        <TextField
          name="goalAmount"
          type="number"
          label="목표금액"
          value={formValues.goalAmount}
          onChange={handleChange}
        />
      </Flex>
      <FixedBottomButton
        disabled={isLoading}
        label="저금통 생성하기"
        onClick={handleSubmit}
      />
    </div>
  )
}

export default withAuth(NewPiggybankPage)
