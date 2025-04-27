import { ChangeEvent, useCallback, useState } from 'react'

import Select from '@shared/Select'
import FixedBottomButton from '@shared/FixedBottomButton'

import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply'
import { ApplyValues } from '@/src/models/apply'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

function BasicInfo({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const 모든정보선택되었는가 = Object.values(infoValues).every(
    (value) => value !== '',
  )
  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={연소득옵션}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={신용점수옵션}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={결제일옵션}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        disabled={!모든정보선택되었는가}
        onClick={() => {
          onNext(infoValues)
        }}
        label="다음"
      />
    </div>
  )
}

export default BasicInfo
