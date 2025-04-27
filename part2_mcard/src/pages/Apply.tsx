import { useState } from 'react'

import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import { ApplyValues } from '@models/apply'
function ApplyPage() {
  const [step, setStep] = useState(1)

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log(terms)
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log(infoValues)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo />}
    </div>
  )
}

export default ApplyPage
