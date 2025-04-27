import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import { ApplyValues, APPLY_STATE } from '@models/apply'

import useUser from '@hooks/auth/useUser'
function Apply({ onSubmit }: { onSubmit: (applyValues: ApplyValues) => void }) {
  const user = useUser()
  const { id } = useParams()
  const storageKey = `applied-${user?.uid}-${id}`

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)
    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    }
    return JSON.parse(applied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATE.READY,
      } as ApplyValues)
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
      step: (prev.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...infoValues,
      step: (prev.step as number) + 1,
    }))
  }

  const handleCardInfo = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...cardInfoValues,
      step: (prev.step as number) + 1,
    }))
  }

  return (
    <div>
      {applyValues.step === 0 && <Terms onNext={handleTermsChange} />}
      {applyValues.step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {applyValues.step === 2 && <CardInfo onNext={handleCardInfo} />}
    </div>
  )
}

export default Apply
